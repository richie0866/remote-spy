import Button from "components/Button";
import Container from "components/Container";
import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import {
	MAX_TAB_CAPTION_WIDTH,
	TabGroupColumn,
	deleteTab,
	getTabCaptionWidth,
	getTabWidth,
	makeSelectTabOffset,
	moveTab,
	selectTabIsActive,
	setActiveTab,
} from "reducers/tab-group";
import { RunService, UserInputService } from "@rbxts/services";
import { formatEscapes } from "utils/format-escapes";
import { tabIcons } from "./constants";
import { useBinding, useEffect, useMemo, useState, withHooksPure } from "@rbxts/roact-hooked";
import { useDraggableTab } from "./use-draggable-tab";
import { useRootDispatch, useRootSelector, useRootStore } from "hooks/use-root-store";
import { useSingleMotor, useSpring } from "@rbxts/roact-hooked-plus";

interface Props {
	tab: TabGroupColumn;
	canvasPosition: Roact.Binding<Vector2>;
}

const FOREGROUND_ACTIVE = new Instant(0);
const FOREGROUND_DEFAULT = new Spring(0.4, { frequency: 6 });
const FOREGROUND_HOVERED = new Spring(0.2, { frequency: 6 });

const CLOSE_DEFAULT = new Spring(1, { frequency: 6 });
const CLOSE_HOVERED = new Spring(0.9, { frequency: 6 });
const CLOSE_PRESSED = new Instant(0.94);

function Tab({ tab, canvasPosition }: Props) {
	const dispatch = useRootDispatch();
	const width = useMemo(() => getTabWidth(tab), [tab]);
	const captionWidth = useMemo(() => getTabCaptionWidth(tab), [tab]);

	// State
	const selectTabOffset = useMemo(makeSelectTabOffset, []);
	const active = useRootSelector((state) => selectTabIsActive(state, tab.id));
	const offset = useRootSelector((state) => selectTabOffset(state, tab.id));

	// Dragging
	const [dragPosition, setDragState] = useDraggableTab(tab.id, width, canvasPosition);

	// Animation
	const [foreground, setForeground] = useSingleMotor(active ? 0 : 0.4);
	const [closeBackground, setCloseBackground] = useSingleMotor(1);
	const offsetAnim = useSpring(offset, { frequency: 30, dampingRatio: 3 });

	useEffect(() => {
		setForeground(active ? FOREGROUND_ACTIVE : FOREGROUND_DEFAULT);
	}, [active]);

	return (
		<Button
			onPress={(_, x) => {
				if (!active) dispatch(setActiveTab(tab.id));
				setDragState({
					dragging: false,
					mousePosition: x,
					tabPosition: offset,
				});
			}}
			onClick={() => !active && setForeground(FOREGROUND_HOVERED)}
			onHover={() => !active && setForeground(FOREGROUND_HOVERED)}
			onHoverEnd={() => !active && setForeground(FOREGROUND_DEFAULT)}
			size={new UDim2(0, width, 1, 0)}
			position={Roact.joinBindings({ dragPosition, offsetAnim }).map((binding) => {
				const xOffset =
					binding.dragPosition !== undefined
						? math.max(binding.dragPosition, 0)
						: math.round(binding.offsetAnim);

				return new UDim2(0, xOffset, 0, 0);
			})}
			zIndex={dragPosition.map((drag) => (drag !== undefined ? 1 : 0))}
		>
			{/* Selection background */}
			<imagelabel
				Image="rbxassetid://9896472554"
				ImageTransparency={active ? 0.96 : 1}
				ImageColor3={Color3.fromHex("#FFFFFF")}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				ScaleType="Slice"
				SliceCenter={new Rect(8, 8, 8, 8)}
			/>

			{/* Round out border */}
			<imagelabel
				Image="rbxassetid://9896472759"
				ImageTransparency={active ? 0.96 : 1}
				ImageColor3={Color3.fromHex("#FFFFFF")}
				Size={new UDim2(0, 5, 0, 5)}
				Position={new UDim2(0, -5, 1, -5)}
				BackgroundTransparency={1}
			/>
			<imagelabel
				Image="rbxassetid://9896472676"
				ImageTransparency={active ? 0.96 : 1}
				ImageColor3={Color3.fromHex("#FFFFFF")}
				Size={new UDim2(0, 5, 0, 5)}
				Position={new UDim2(1, 0, 1, -5)}
				BackgroundTransparency={1}
			/>

			<Container>
				{/* Icon */}
				<imagelabel
					Image={tabIcons[tab.type]}
					ImageTransparency={foreground}
					Size={new UDim2(0, 16, 0, 16)}
					BackgroundTransparency={1}
				/>

				{/* Caption */}
				<textlabel
					Text={formatEscapes(tab.caption)}
					Font="Gotham"
					TextColor3={new Color3(1, 1, 1)}
					TextTransparency={foreground}
					TextSize={11}
					TextXAlignment="Left"
					TextYAlignment="Center"
					Size={new UDim2(0, captionWidth, 1, 0)}
					BackgroundTransparency={1}
				>
					{captionWidth === MAX_TAB_CAPTION_WIDTH && (
						<uigradient
							Transparency={
								new NumberSequence([
									new NumberSequenceKeypoint(0, 0),
									new NumberSequenceKeypoint(0.9, 0),
									new NumberSequenceKeypoint(1, 1),
								])
							}
						/>
					)}
				</textlabel>

				{/* Close button */}
				{tab.canClose && (
					<Button
						onClick={() => dispatch(deleteTab(tab.id))}
						onPress={() => setCloseBackground(CLOSE_PRESSED)}
						onHover={() => setCloseBackground(CLOSE_HOVERED)}
						onHoverEnd={() => setCloseBackground(CLOSE_DEFAULT)}
						transparency={closeBackground}
						size={new UDim2(0, 17, 0, 17)}
						cornerRadius={new UDim(0, 4)}
					>
						<imagelabel
							Image="rbxassetid://9896553856"
							ImageTransparency={foreground}
							Size={new UDim2(0, 16, 0, 16)}
							BackgroundTransparency={1}
						/>
					</Button>
				)}
				<uipadding
					PaddingLeft={new UDim(0, 8)}
					PaddingRight={new UDim(0, 8)}
					PaddingTop={new UDim(0, 10)}
					PaddingBottom={new UDim(0, 10)}
				/>
				<uilistlayout
					Padding={new UDim(0, 6)}
					FillDirection="Horizontal"
					HorizontalAlignment="Left"
					VerticalAlignment="Center"
				/>
			</Container>
		</Button>
	);
}

export default withHooksPure(Tab);

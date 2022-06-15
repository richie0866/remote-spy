import Button from "components/Button";
import Container from "components/Container";
import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { MAX_TAB_CAPTION_WIDTH, TabGroupColumn, deleteTab, getTabCaptionWidth, getTabWidth } from "reducers/tab-group";
import { RunService, UserInputService } from "@rbxts/services";
import { pure, useBinding, useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { tabIcons } from "./constants";
import { useDeleteTab, useMoveTab, useSetActiveTab, useTabIsActive, useTabOffset, useTabWidth } from "./use-tab-group";
import { useRootStore } from "hooks/use-root-store";
import { useSingleMotor, useSpring } from "@rbxts/roact-hooked-plus";

interface Props {
	tab: TabGroupColumn;
	canvasPosition: Roact.Binding<Vector2>;
}

interface DragState {
	dragging: boolean;
	mousePosition: number;
	tabPosition: number;
}

const FOREGROUND_ACTIVE = new Instant(0);
const FOREGROUND_DEFAULT = new Spring(0.4, { frequency: 6 });
const FOREGROUND_HOVERED = new Spring(0.2, { frequency: 6 });

const CLOSE_DEFAULT = new Spring(1, { frequency: 6 });
const CLOSE_HOVERED = new Spring(0.9, { frequency: 6 });
const CLOSE_PRESSED = new Instant(0.94);

function TabColumn({ tab, canvasPosition }: Props) {
	const store = useRootStore();

	// Rodux state
	const active = useTabIsActive(tab.id);
	const width = useTabWidth(tab);
	const offset = useTabOffset(tab.id);
	const captionWidth = useMemo(() => getTabCaptionWidth(tab), [tab]);

	// Dispatchers
	const activate = useSetActiveTab(tab.id);
	const move = useMoveTab(tab.id);
	const close = useDeleteTab(tab.id);

	// Animation
	const [foreground, setForeground] = useSingleMotor(active ? 0 : 0.4);
	const [closeBackground, setCloseBackground] = useSingleMotor(1);
	const offsetAnimation = useSpring(offset, { frequency: 30, dampingRatio: 3 });

	useEffect(() => {
		setForeground(active ? FOREGROUND_ACTIVE : FOREGROUND_DEFAULT);
	}, [active]);

	// Dragging
	const [dragState, setDragState] = useState<DragState>();
	const [dragPosition, setDragPosition] = useBinding<number | undefined>(undefined);

	useEffect(() => {
		if (!dragState) return;

		const estimateNewIndex = (dragOffset: number) => {
			let totalWidth = 0;

			for (const t of tabs) {
				totalWidth += getTabWidth(t);

				if (totalWidth > dragOffset + width / 2) {
					return tabs.indexOf(t);
				}
			}

			return tabs.size() - 1;
		};

		const tabs = store.getState().tabGroup.tabs;
		const startCanvasPosition = canvasPosition.getValue();

		let lastIndex = estimateNewIndex(0);

		const mouseMoved = RunService.Heartbeat.Connect(() => {
			const current = UserInputService.GetMouseLocation();
			const position = current.X - dragState.mousePosition + dragState.tabPosition;
			const canvasDelta = canvasPosition.getValue().X - startCanvasPosition.X;

			setDragPosition(position + canvasDelta);

			const newIndex = estimateNewIndex(position + canvasDelta);
			if (newIndex !== lastIndex) {
				lastIndex = newIndex;
				move(newIndex);
			}
		});

		const mouseUp = UserInputService.InputEnded.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				setDragState(undefined);
				setDragPosition(undefined);
			}
		});

		return () => {
			mouseMoved.Disconnect();
			mouseUp.Disconnect();
		};
	}, [dragState]);

	return (
		<Button
			onPress={(_, x) => {
				if (!active) activate();
				setDragState({
					dragging: false,
					mousePosition: x,
					tabPosition: offset,
				});
			}}
			onClick={() => !active && setForeground(FOREGROUND_HOVERED)}
			onHover={() => !active && setForeground(FOREGROUND_HOVERED)}
			onLeave={() => !active && setForeground(FOREGROUND_DEFAULT)}
			size={new UDim2(0, width, 1, 0)}
			position={Roact.joinBindings({ dragPosition, offsetAnimation }).map((binding) => {
				const xOffset =
					binding.dragPosition !== undefined
						? math.max(binding.dragPosition, 0)
						: math.round(binding.offsetAnimation);

				return new UDim2(0, xOffset, 0, 0);
			})}
			zIndex={dragPosition.map((drag) => (drag !== undefined ? 1 : 0))}
		>
			{/* Selection background */}
			<imagelabel
				Image="rbxassetid://9896472554"
				ImageTransparency={active ? 0.7 : 1}
				ImageColor3={Color3.fromHex("#424242")}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				ScaleType="Slice"
				SliceCenter={new Rect(8, 8, 8, 8)}
			/>

			{/* Round out border */}
			<imagelabel
				Image="rbxassetid://9896472759"
				ImageTransparency={active ? 0.7 : 1}
				ImageColor3={Color3.fromHex("#424242")}
				Size={new UDim2(0, 5, 0, 5)}
				Position={new UDim2(0, -5, 1, -5)}
				BackgroundTransparency={1}
			/>
			<imagelabel
				Image="rbxassetid://9896472676"
				ImageTransparency={active ? 0.7 : 1}
				ImageColor3={Color3.fromHex("#424242")}
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
					Text={tab.caption}
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
						onClick={() => {
							deleteTab(tab.id);
							close();
						}}
						onPress={() => setCloseBackground(CLOSE_PRESSED)}
						onHover={() => setCloseBackground(CLOSE_HOVERED)}
						onLeave={() => setCloseBackground(CLOSE_DEFAULT)}
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

export default pure(TabColumn);

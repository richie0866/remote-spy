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
	const [transparency, setGoal] = useSingleMotor(active ? 0 : 0.4);
	const [closeTransparency, setCloseGoal] = useSingleMotor(1);
	const offsetAnimation = useSpring(offset, { frequency: 30, dampingRatio: 3 });

	useEffect(() => {
		active ? setGoal(new Instant(0)) : setGoal(new Spring(0.4, { frequency: 6 }));
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
		<imagebutton
			Event={{
				MouseButton1Down: (_, x) => {
					if (!active) activate();
					setDragState({
						dragging: true,
						mousePosition: x,
						tabPosition: offset,
					});
				},
				Activated: () => !active && setGoal(new Spring(0.2, { frequency: 6 })),
				MouseEnter: () => !active && setGoal(new Spring(0.2, { frequency: 6 })),
				MouseLeave: () => !active && setGoal(new Spring(0.4, { frequency: 6 })),
			}}
			Image="rbxassetid://9896472554"
			ImageTransparency={active ? 0.7 : 1}
			ImageColor3={Color3.fromHex("#424242")}
			ScaleType="Slice"
			SliceCenter={new Rect(8, 8, 8, 8)}
			Size={new UDim2(0, width, 1, 0)}
			Position={Roact.joinBindings({ dragPosition, offsetAnimation }).map(
				(binding) =>
					new UDim2(
						0,
						binding.dragPosition !== undefined
							? math.max(binding.dragPosition, 0)
							: math.round(binding.offsetAnimation),
						0,
						0,
					),
			)}
			ZIndex={dragPosition.map((drag) => (drag !== undefined ? 1 : 0))}
			BackgroundTransparency={1}
			Active={true}
			AutoButtonColor={false}
		>
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
				<imagelabel
					Image={tabIcons[tab.type]}
					ImageTransparency={transparency}
					Size={new UDim2(0, 16, 0, 16)}
					BackgroundTransparency={1}
				/>
				<textlabel
					Text={tab.caption}
					Font="Gotham"
					TextColor3={new Color3(1, 1, 1)}
					TextTransparency={transparency}
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
				{tab.canClose && (
					<imagebutton
						Event={{
							Activated: () => {
								deleteTab(tab.id);
								close();
							},
							MouseButton1Down: () => setCloseGoal(new Instant(0.9)),
							MouseEnter: () => setCloseGoal(new Spring(0.85, { frequency: 6 })),
							MouseLeave: () => setCloseGoal(new Spring(1, { frequency: 6 })),
						}}
						Image="rbxassetid://9896553856"
						ImageTransparency={transparency}
						BackgroundColor3={new Color3(1, 1, 1)}
						BackgroundTransparency={closeTransparency}
						AutoButtonColor={false}
						Size={new UDim2(0, 16, 0, 16)}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</imagebutton>
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
		</imagebutton>
	);
}

export default pure(TabColumn);

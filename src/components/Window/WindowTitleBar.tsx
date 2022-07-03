import Roact from "@rbxts/roact";
import { useCallback, useEffect, useState, withHooksPure } from "@rbxts/roact-hooked";
import { Instant, Spring, useSingleMotor } from "@rbxts/roact-hooked-plus";
import { UserInputService } from "@rbxts/services";
import Button from "components/Button";
import Container from "components/Container";
import { TOPBAR_OFFSET } from "constants";
import { useWindowContext } from "./useWindowContext";

interface WindowTitleBarProps {
	caption: string;
	icon?: string;
	onClose?: () => void;
}

function WindowTitleBar({ caption, icon = "rbxassetid://9886659555", onClose }: WindowTitleBarProps) {
	const window = useWindowContext();

	const [closeMotor, setCloseMotor] = useSingleMotor(1);
	const [minimizeMotor, setMinimizeMotor] = useSingleMotor(1);
	const [maximizeMotor, setMaximizeMotor] = useSingleMotor(1);

	const [dragState, setDragState] = useState<{
		mouseStart: Vector2;
		windowStart: Vector2;
	}>();

	useEffect(() => {
		if (!dragState) return;

		const { mouseStart, windowStart } = dragState;

		const mouseMoved = UserInputService.InputChanged.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseMovement) return;

			const mouseCurrent = UserInputService.GetMouseLocation();
			const mouseDelta = mouseCurrent.sub(mouseStart);

			window.setPosition(windowStart.add(mouseDelta));

			if (window.maximized) {
				window.setMaximized(false);
			}
		});

		const mouseReleased = UserInputService.InputEnded.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

			setDragState(undefined);
		});

		return () => {
			mouseMoved.Disconnect();
			mouseReleased.Disconnect();
		};
	}, [dragState, window.maximized]);

	// On mouse down, start dragging the window
	const onStartDrag = useCallback(
		(rbx: TextButton, x: number, y: number) => {
			if (window.maximized) {
				const currentSize = new Vector2(window.size.getValue().X - 46 * 3, 42);
				const mouseStart = new Vector2(
					(x * currentSize.X) / rbx.AbsoluteSize.X,
					(y * currentSize.Y) / rbx.AbsoluteSize.Y,
				);
				setDragState({ mouseStart, windowStart: Vector2.zero });
			} else {
				setDragState({ mouseStart: new Vector2(x, y), windowStart: rbx.AbsolutePosition.add(TOPBAR_OFFSET) });
			}
		},
		[window.maximized],
	);

	return (
		<Container size={new UDim2(1, 0, 0, 42)}>
			{/* Icon */}
			<imagelabel
				Image={icon}
				Size={new UDim2(0, 16, 0, 16)}
				Position={new UDim2(0, 16, 0.5, 0)}
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
			/>

			{/* Caption */}
			<textlabel
				RichText
				Text={caption}
				Font="Gotham"
				TextSize={11}
				TextXAlignment="Left"
				TextYAlignment="Center"
				TextColor3={Color3.fromHex("#FFFFFF")}
				TextTransparency={0.05}
				Size={new UDim2(1, -44, 1, 0)}
				Position={new UDim2(0, 44, 0, 0)}
				BackgroundTransparency={1}
			/>

			{/* Drag Handle */}
			<Button onPress={onStartDrag} active={false} size={new UDim2(1, -46 * 3, 1, 0)} />

			{/* Close Button */}
			<Button
				onClick={() => {
					setCloseMotor(new Spring(0, { frequency: 6 }));
					onClose?.();
				}}
				onPress={() => setCloseMotor(new Instant(0.25))}
				onMouseEnter={() => setCloseMotor(new Spring(0, { frequency: 6 }))}
				onMouseLeave={() => setCloseMotor(new Spring(1, { frequency: 6 }))}
				size={new UDim2(0, 46, 1, 0)}
				position={new UDim2(1, -46, 0, 0)}
			>
				{/* Background */}
				<Button.Icon
					icon="rbxassetid://9887215356"
					size={new UDim2(1, 0, 1, 0)}
					scaleType={Enum.ScaleType.Slice}
					sliceCenter={new Rect(8, 8, 8, 8)}
					color={Color3.fromHex("#C83D3D")}
					transparency={closeMotor}
				/>

				{/* Icon */}
				<Button.Icon icon="rbxassetid://9886659671" size={new UDim2(0, 16, 0, 16)} />
			</Button>

			{/* Maximize or Restore Down Button */}
			<Button
				onClick={() => {
					setMaximizeMotor(new Spring(0.94, { frequency: 6 }));
					window.setMaximized(!window.maximized);
				}}
				onPress={() => setMaximizeMotor(new Instant(0.96))}
				onMouseEnter={() => setMaximizeMotor(new Spring(0.94, { frequency: 6 }))}
				onMouseLeave={() => setMaximizeMotor(new Spring(1, { frequency: 6 }))}
				size={new UDim2(0, 46, 1, 0)}
				position={new UDim2(1, -46 * 2, 0, 0)}
				transparency={maximizeMotor}
			>
				<Button.Icon
					icon={window.maximized ? "rbxassetid://9886659001" : "rbxassetid://9886659406"}
					size={new UDim2(0, 16, 0, 16)}
				/>
			</Button>

			{/* Minimize Button */}
			<Button
				onClick={() => {
					const viewportSize = game.GetService("Workspace").CurrentCamera!.ViewportSize;

					// TODO: Fully support minimize
					window.setPosition(viewportSize.sub(new Vector2(42, 42)));
					window.setMaximized(false);

					setMinimizeMotor(new Spring(0.94, { frequency: 6 }));
				}}
				onPress={() => setMinimizeMotor(new Instant(0.96))}
				onMouseEnter={() => setMinimizeMotor(new Spring(0.94, { frequency: 6 }))}
				onMouseLeave={() => setMinimizeMotor(new Spring(1, { frequency: 6 }))}
				size={new UDim2(0, 46, 1, 0)}
				position={new UDim2(1, -46 * 3, 0, 0)}
				transparency={minimizeMotor}
			>
				<Button.Icon icon="rbxassetid://9886659276" size={new UDim2(0, 16, 0, 16)} />
			</Button>
		</Container>
	);
}

export default withHooksPure(WindowTitleBar);

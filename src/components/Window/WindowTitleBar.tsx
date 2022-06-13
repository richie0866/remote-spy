import Container from "components/Container";
import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { TOPBAR_OFFSET } from "constants/app";
import { UserInputService } from "@rbxts/services";
import { WindowAssets } from "./assets";
import { pure, useBinding, useEffect, useState } from "@rbxts/roact-hooked";
import { useSingleMotor } from "@rbxts/roact-hooked-plus";
import { useWindowContext } from "./use-window-context";

interface Props extends Roact.PropsWithChildren {
	caption?: string;
	captionColor?: Color3;
	captionTransparency?: number;
	icon?: string;
	height?: number;
	onClose?: () => void;
}

function WindowTitleBar({
	caption = "New window",
	captionColor = new Color3(1, 1, 1),
	captionTransparency = 0,
	icon = WindowAssets.DefaultWindowIcon,
	height = 42,
	onClose,
	[Roact.Children]: children,
}: Props) {
	const { size, maximized, setMaximized, setPosition } = useWindowContext();

	const [closeTransparency, setCloseTransparency] = useSingleMotor(1);
	const [minimizeTransparency, setMinimizeTransparency] = useSingleMotor(1);
	const [maximizeTransparency, setMaximizeTransparency] = useSingleMotor(1);

	const [startPosition, setStartPosition] = useBinding(new Vector2());
	const [dragStart, setDragStart] = useState<Vector2>();

	useEffect(() => {
		if (!dragStart) return;

		const startPos = startPosition.getValue();
		let shouldMinimize = maximized;

		const mouseMoved = UserInputService.InputChanged.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseMovement) {
				const current = UserInputService.GetMouseLocation();
				const delta = current.sub(dragStart);

				setPosition(startPos.add(delta));

				if (shouldMinimize) {
					shouldMinimize = false;
					setMaximized(false);
				}
			}
		});

		const mouseUp = UserInputService.InputEnded.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				setDragStart(undefined);
			}
		});

		return () => {
			mouseMoved.Disconnect();
			mouseUp.Disconnect();
		};
	}, [dragStart]);

	return (
		<Container size={new UDim2(1, 0, 0, height)}>
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
				TextColor3={captionColor}
				TextTransparency={captionTransparency}
				Font="Gotham"
				TextSize={11}
				TextXAlignment="Left"
				TextYAlignment="Center"
				Size={new UDim2(1, -44, 1, 0)}
				Position={new UDim2(0, 44, 0, 0)}
				BackgroundTransparency={1}
			/>

			{/* Drag Handle */}
			<textbutton
				Event={{
					MouseButton1Down: (rbx, x, y) => {
						const mouse = new Vector2(x, y);
						if (maximized) {
							const currentSize = new Vector2(size.getValue().X - 46 * 3, height);
							setStartPosition(new Vector2());
							setDragStart(mouse.mul(currentSize.div(rbx.AbsoluteSize)));
						} else {
							setStartPosition(rbx.AbsolutePosition.add(TOPBAR_OFFSET));
							setDragStart(mouse);
						}
					},
				}}
				Active={false}
				Text=""
				Size={new UDim2(1, -46 * 3, 1, 0)}
				BackgroundTransparency={1}
				AutoButtonColor={false}
			/>

			{/* Close */}
			<imagebutton
				Event={{
					Activated: () => {
						setCloseTransparency(new Spring(0, { frequency: 6 }));
						onClose?.();
					},
					MouseButton1Down: () => setCloseTransparency(new Instant(0.25)),
					MouseEnter: () => setCloseTransparency(new Spring(0, { frequency: 6 })),
					MouseLeave: () => setCloseTransparency(new Spring(1, { frequency: 6 })),
				}}
				Image={WindowAssets.CloseButton}
				ImageTransparency={closeTransparency}
				ImageColor3={Color3.fromHex("#C83D3D")}
				ScaleType="Slice"
				SliceCenter={new Rect(8, 8, 8, 8)}
				Size={new UDim2(0, 46, 1, 0)}
				Position={new UDim2(1, 0, 0, 0)}
				AnchorPoint={new Vector2(1, 0)}
				AutoButtonColor={false}
				BackgroundTransparency={1}
				BorderSizePixel={0}
			>
				<imagelabel
					Image={WindowAssets.Close}
					Size={new UDim2(0, 16, 0, 16)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
				/>
			</imagebutton>

			{/* Maximize/Restore Down */}
			<textbutton
				Event={{
					Activated: () => {
						setMaximizeTransparency(new Spring(0.94, { frequency: 6 }));
						setMaximized(!maximized);
					},
					MouseButton1Down: () => setMaximizeTransparency(new Instant(0.96)),
					MouseEnter: () => setMaximizeTransparency(new Spring(0.94, { frequency: 6 })),
					MouseLeave: () => setMaximizeTransparency(new Spring(1, { frequency: 6 })),
				}}
				BackgroundTransparency={maximizeTransparency}
				BackgroundColor3={Color3.fromHex("#FFFFFF")}
				Size={new UDim2(0, 46, 1, 0)}
				Position={new UDim2(1, -46, 0, 0)}
				AnchorPoint={new Vector2(1, 0)}
				Text=""
				AutoButtonColor={false}
				BorderSizePixel={0}
			>
				<imagelabel
					Image={maximized ? WindowAssets.RestoreDown : WindowAssets.Maximize}
					Size={new UDim2(0, 16, 0, 16)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
				/>
			</textbutton>

			{/* Minimize */}
			<textbutton
				Event={{
					Activated: () => {
						const viewportSize = game.GetService("Workspace").CurrentCamera?.ViewportSize;
						if (viewportSize) {
							setPosition(viewportSize.sub(new Vector2(42, height)));
							if (maximized) setMaximized(false);
						}
						setMinimizeTransparency(new Spring(0.94, { frequency: 6 }));
					},
					MouseButton1Down: () => setMinimizeTransparency(new Instant(0.96)),
					MouseEnter: () => setMinimizeTransparency(new Spring(0.94, { frequency: 6 })),
					MouseLeave: () => setMinimizeTransparency(new Spring(1, { frequency: 6 })),
				}}
				BackgroundTransparency={minimizeTransparency}
				BackgroundColor3={Color3.fromHex("#FFFFFF")}
				Size={new UDim2(0, 46, 1, 0)}
				Position={new UDim2(1, -46 * 2, 0, 0)}
				AnchorPoint={new Vector2(1, 0)}
				Text=""
				AutoButtonColor={false}
				BorderSizePixel={0}
			>
				<imagelabel
					Image={WindowAssets.Minimize}
					Size={new UDim2(0, 16, 0, 16)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
				/>
			</textbutton>

			{children}
		</Container>
	);
}

export default pure(WindowTitleBar);

import Button from "components/Button";
import Container from "components/Container";
import Roact from "@rbxts/roact";
import { UserInputService } from "@rbxts/services";
import { useEffect, useState, withHooksPure } from "@rbxts/roact-hooked";
import { useWindowContext } from "./use-window-context";

const THICKNESS = 14;

interface Props {
	minSize?: Vector2;
	maxSize?: Vector2;
}

interface DragState {
	mouse: Vector2;
	direction: Vector2;
}

const Handle = (props: { size: UDim2; position: UDim2; dragStart: (mouse: Vector2) => void }) => (
	<Button
		onPress={(_, x, y) => props.dragStart(new Vector2(x, y))}
		anchorPoint={new Vector2(0.5, 0.5)}
		size={props.size}
		position={props.position}
		active={false}
	/>
);

function WindowResize({ minSize = new Vector2(250, 250), maxSize = new Vector2(2048, 2048) }: Props) {
	const { size, setSize, position, setPosition, maximized } = useWindowContext();
	const [dragStart, setDragStart] = useState<DragState>();

	useEffect(() => {
		if (!dragStart || maximized) return;

		const startPosition = position.getValue();
		const startSize = size.getValue();

		const inputBegan = UserInputService.InputChanged.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseMovement) {
				const current = UserInputService.GetMouseLocation();
				const delta = current.sub(dragStart.mouse);

				const targetSize = startSize.add(dragStart.direction.mul(delta));
				const targetSizeClamped = new Vector2(
					math.clamp(targetSize.X, minSize.X, maxSize.X),
					math.clamp(targetSize.Y, minSize.Y, maxSize.Y),
				);
				setSize(targetSizeClamped);

				if (dragStart.direction.X < 0 && dragStart.direction.Y < 0) {
					setPosition(startPosition.add(startSize.sub(targetSizeClamped)));
				} else if (dragStart.direction.X < 0) {
					setPosition(new Vector2(startPosition.X + (startSize.X - targetSizeClamped.X), startPosition.Y));
				} else if (dragStart.direction.Y < 0) {
					setPosition(new Vector2(startPosition.X, startPosition.Y + (startSize.Y - targetSizeClamped.Y)));
				}
			}
		});

		const inputEnded = UserInputService.InputEnded.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				setDragStart(undefined);
			}
		});

		return () => {
			inputBegan.Disconnect();
			inputEnded.Disconnect();
		};
	}, [dragStart]);

	return (
		<Container>
			{/* Top */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(0, -1) })}
				size={new UDim2(1, -THICKNESS, 0, THICKNESS)}
				position={new UDim2(0.5, 0, 0, 0)}
			/>

			{/* Left */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(-1, 0) })}
				size={new UDim2(0, THICKNESS, 1, -THICKNESS)}
				position={new UDim2(0, 0, 0.5, 0)}
			/>

			{/* Right */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(1, 0) })}
				size={new UDim2(0, THICKNESS, 1, -THICKNESS)}
				position={new UDim2(1, 0, 0.5, 0)}
			/>

			{/* Bottom */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(0, 1) })}
				size={new UDim2(1, -THICKNESS, 0, THICKNESS)}
				position={new UDim2(0.5, 0, 1, 0)}
			/>

			{/* Top-Left */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(-1, -1) })}
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				position={new UDim2(0, 0, 0, 0)}
			/>

			{/* Top-Right */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(1, -1) })}
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				position={new UDim2(1, 0, 0, 0)}
			/>

			{/* Bottom-Left */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(-1, 1) })}
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				position={new UDim2(0, 0, 1, 0)}
			/>

			{/* Bottom-Right */}
			<Handle
				dragStart={(mouse) => setDragStart({ mouse, direction: new Vector2(1, 1) })}
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				position={new UDim2(1, 0, 1, 0)}
			/>
		</Container>
	);
}

export default withHooksPure(WindowResize);

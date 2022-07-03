import Roact from "@rbxts/roact";
import { useCallback, useEffect, useState, withHooksPure } from "@rbxts/roact-hooked";
import { UserInputService } from "@rbxts/services";
import Container from "components/Container";
import ResizeHandle from "./ResizeHandle";
import { useWindowContext } from "./useWindowContext";

interface WindowResizableProps {
	minSize?: Vector2;
	maxSize?: Vector2;
}

const THICKNESS = 14;

function WindowResizable({ minSize = new Vector2(300, 250), maxSize = new Vector2(2048, 2048) }: WindowResizableProps) {
	const window = useWindowContext();

	const [resizeState, setResizeState] = useState<{
		mouseStart: Vector2;
		direction: Vector2;
	}>();

	const createResizeHandler = useCallback(
		(direction: Vector2) => (x: number, y: number) => setResizeState({ mouseStart: new Vector2(x, y), direction }),
		[],
	);

	const updateSize = useCallback(
		(initialSize: Vector2, mouseDelta: Vector2) => {
			const { direction } = resizeState!;

			const newSize = new Vector2(
				math.clamp(initialSize.X + direction.X * mouseDelta.X, minSize.X, maxSize.X),
				math.clamp(initialSize.Y + direction.Y * mouseDelta.Y, minSize.Y, maxSize.Y),
			);

			window.setSize(newSize);
			return newSize;
		},
		[resizeState],
	);

	const updatePosition = useCallback(
		(initialSize: Vector2, initialPosition: Vector2, newSize: Vector2) => {
			const { direction } = resizeState!;

			if (direction.X < 0 && direction.Y < 0) {
				window.setPosition(initialPosition.add(initialSize.sub(newSize)));
			} else if (direction.X < 0) {
				window.setPosition(new Vector2(initialPosition.X + (initialSize.X - newSize.X), initialPosition.Y));
			} else if (direction.Y < 0) {
				window.setPosition(new Vector2(initialPosition.X, initialPosition.Y + (initialSize.Y - newSize.Y)));
			}
		},
		[resizeState],
	);

	useEffect(() => {
		if (!resizeState || window.maximized) return;

		const initialSize = window.size.getValue();
		const initialPosition = window.position.getValue();

		const mouseMoved = UserInputService.InputChanged.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseMovement) return;

			const mouseCurrent = UserInputService.GetMouseLocation();
			const mouseDelta = mouseCurrent.sub(resizeState.mouseStart);

			const newSize = updateSize(initialSize, mouseDelta);

			updatePosition(initialSize, initialPosition, newSize);
		});

		const mouseReleased = UserInputService.InputEnded.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

			setResizeState(undefined);
		});

		return () => {
			mouseMoved.Disconnect();
			mouseReleased.Disconnect();
		};
	}, [resizeState]);

	return (
		<Container>
			{/* Up */}
			<ResizeHandle
				size={new UDim2(1, -THICKNESS, 0, THICKNESS)}
				center={new UDim2(0.5, 0, 0, 0)}
				onPress={createResizeHandler(new Vector2(0, -1))}
			/>

			{/* Left */}
			<ResizeHandle
				size={new UDim2(0, THICKNESS, 1, -THICKNESS)}
				center={new UDim2(0, 0, 0.5, 0)}
				onPress={createResizeHandler(new Vector2(-1, 0))}
			/>

			{/* Right */}
			<ResizeHandle
				size={new UDim2(0, THICKNESS, 1, -THICKNESS)}
				center={new UDim2(1, 0, 0.5, 0)}
				onPress={createResizeHandler(new Vector2(1, 0))}
			/>

			{/* Down */}
			<ResizeHandle
				size={new UDim2(1, -THICKNESS, 0, THICKNESS)}
				center={new UDim2(0.5, 0, 1, 0)}
				onPress={createResizeHandler(new Vector2(0, 1))}
			/>

			{/* Up Left */}
			<ResizeHandle
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				center={new UDim2(0, 0, 0, 0)}
				onPress={createResizeHandler(new Vector2(-1, -1))}
			/>

			{/* Up Right */}
			<ResizeHandle
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				center={new UDim2(1, 0, 0, 0)}
				onPress={createResizeHandler(new Vector2(1, -1))}
			/>

			{/* Down Left */}
			<ResizeHandle
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				center={new UDim2(0, 0, 1, 0)}
				onPress={createResizeHandler(new Vector2(-1, 1))}
			/>

			{/* Down Right */}
			<ResizeHandle
				size={new UDim2(0, THICKNESS, 0, THICKNESS)}
				center={new UDim2(1, 0, 1, 0)}
				onPress={createResizeHandler(new Vector2(1, 1))}
			/>
		</Container>
	);
}

export default withHooksPure(WindowResizable);

import Roact from "@rbxts/roact";
import Button from "components/Button";

interface ResizeHandleProps {
	size: UDim2;
	center: UDim2;
	onPress: (x: number, y: number) => void;
}

export default function ResizeHandle({ size, center, onPress }: ResizeHandleProps) {
	return (
		<Button
			onPress={(rbx, x, y) => onPress(x, y)}
			anchorPoint={new Vector2(0.5, 0.5)}
			size={size}
			position={center}
			active={false}
		/>
	);
}

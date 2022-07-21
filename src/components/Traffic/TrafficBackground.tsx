import Roact from "@rbxts/roact";

export default function TrafficBackground() {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={0.96}>
			<uicorner CornerRadius={new UDim(0, 8)} />
		</frame>
	);
}

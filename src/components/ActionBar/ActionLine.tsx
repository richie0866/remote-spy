import Container from "components/Container";
import Roact from "@rbxts/roact";

export default function ActionLine() {
	return (
		<Container size={new UDim2(0, 13, 0, 32)}>
			<frame
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.92}
				Size={new UDim2(0, 1, 0, 24)}
				Position={new UDim2(0, 6, 0, 4)}
				BorderSizePixel={0}
			/>
		</Container>
	);
}

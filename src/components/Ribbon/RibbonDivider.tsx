import Roact from "@rbxts/roact";
import Container from "components/Container";

export default function RibbonDivider() {
	return (
		<Container size={new UDim2(0, 13, 1, 0)}>
			<frame
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.92}
				Size={new UDim2(0, 1, 0, 24)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BorderSizePixel={0}
			/>
		</Container>
	);
}

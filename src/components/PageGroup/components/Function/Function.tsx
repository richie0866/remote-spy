import Container from "components/Container";
import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

function Function() {
	return (
		<Container>
			<textlabel
				Text="Function page"
				TextSize={30}
				TextColor3={new Color3(1, 1, 1)}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
			/>
		</Container>
	);
}

export default pure(Function);

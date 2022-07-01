import Container from "components/Container";
import Roact from "@rbxts/roact";
import { withHooksPure } from "@rbxts/roact-hooked";

function Script() {
	return (
		<Container>
			<textlabel
				Text="Script page"
				TextSize={30}
				TextColor3={new Color3(1, 1, 1)}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
			/>
		</Container>
	);
}

export default withHooksPure(Script);

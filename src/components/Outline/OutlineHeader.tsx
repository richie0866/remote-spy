import Roact from "@rbxts/roact";
import { withHooksPure } from "@rbxts/roact-hooked";

function OutlineHeader() {
	return (
		<>
			<textlabel
				Text="Outline"
				Font={Enum.Font.GothamMedium}
				TextSize={11}
				TextColor3={Color3.fromHex("#FFFFFF")}
				TextXAlignment="Left"
				Size={new UDim2(1, -24, 0, 12)}
				Position={new UDim2(0, 12, 0, 12)}
				BackgroundTransparency={1}
			/>
		</>
	);
}

export default withHooksPure(OutlineHeader);

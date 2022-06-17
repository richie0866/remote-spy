import ActionBarEffects from "./ActionBarEffects";
import ActionButton from "./ActionButton";
import ActionLine from "./ActionLine";
import Container from "components/Container";
import Roact from "@rbxts/roact";

export default function ActionBar() {
	return (
		<>
			<frame
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.92}
				Size={new UDim2(1, 0, 0, 1)}
				Position={new UDim2(0, 0, 0, 83)}
				BorderSizePixel={0}
			/>

			<ActionBarEffects />

			<Container size={new UDim2(1, 0, 0, 36)} position={new UDim2(0, 0, 0, 42)}>
				<ActionButton id="navigatePrevious" icon="rbxassetid://9887696242" />
				<ActionButton id="navigateNext" icon="rbxassetid://9887978919" />

				<ActionLine />

				<ActionButton id="copy" icon="rbxassetid://9887696628" />
				<ActionButton id="save" icon="rbxassetid://9932819855" />
				<ActionButton id="delete" icon="rbxassetid://9887696922" />

				<ActionLine />

				<ActionButton id="traceback" icon="rbxassetid://9887697255" caption="Traceback" />
				<ActionButton id="copyPath" icon="rbxassetid://9887697099" caption="Copy as path" />

				<uilistlayout
					Padding={new UDim(0, 4)}
					FillDirection="Horizontal"
					HorizontalAlignment="Left"
					VerticalAlignment="Center"
				/>
				<uipadding PaddingLeft={new UDim(0, 8)} />
			</Container>
		</>
	);
}

import Container from "components/Container";
import Roact from "@rbxts/roact";
import TitleBar from "../components/TitleBar";
import { useSidePanelContext } from "../use-side-panel-context";
import { withHooksPure } from "@rbxts/roact-hooked";

function FunctionTree() {
	const { setUpperHidden, upperHidden, upperSize } = useSidePanelContext();

	return (
		<Container size={upperSize}>
			<TitleBar caption="Function Tree" hidden={upperHidden} toggleHidden={() => setUpperHidden(!upperHidden)} />
			<frame
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.92}
				Size={new UDim2(1, 0, 0, 1)}
				Position={new UDim2(0, 0, 1, -1)}
				BorderSizePixel={0}
			/>
		</Container>
	);
}

export default withHooksPure(FunctionTree);

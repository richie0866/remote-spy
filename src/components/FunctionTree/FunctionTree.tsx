import Container from "components/Container";
import Roact from "@rbxts/roact";
import SidePanel, { useSidePanelContext } from "components/SidePanel";
import { pure } from "@rbxts/roact-hooked";

const Divider = () => (
	<frame
		BackgroundColor3={new Color3(1, 1, 1)}
		BackgroundTransparency={0.92}
		Size={new UDim2(1, 0, 0, 1)}
		Position={new UDim2(0, 0, 1, -1)}
		BorderSizePixel={0}
	/>
);

function FunctionTree() {
	const { setUpperHidden, upperHidden, upperSize } = useSidePanelContext();

	return (
		<Container size={upperSize}>
			<SidePanel.TitleBar
				caption="Function Tree"
				hidden={upperHidden}
				toggleHidden={() => setUpperHidden(!upperHidden)}
			/>
			<Divider />
		</Container>
	);
}

export default pure(FunctionTree);

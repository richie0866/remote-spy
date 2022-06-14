import Container from "components/Container";
import Roact from "@rbxts/roact";
import SidePanel from "components/SidePanel";
import { pure } from "@rbxts/roact-hooked";
import { useSidePanelContext } from "components/SidePanel";

function Traceback() {
	const { lowerHidden, setLowerHidden, lowerSize, lowerPosition } = useSidePanelContext();

	return (
		<Container size={lowerSize} position={lowerPosition}>
			<SidePanel.TitleBar
				caption="Traceback"
				hidden={lowerHidden}
				toggleHidden={() => setLowerHidden(!lowerHidden)}
			/>
		</Container>
	);
}

export default pure(Traceback);

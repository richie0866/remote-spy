import Container from "components/Container";
import Roact from "@rbxts/roact";
import TitleBar from "../components/TitleBar";
import { useSidePanelContext } from "../use-side-panel-context";
import { withHooksPure } from "@rbxts/roact-hooked";

function Traceback() {
	const { lowerHidden, setLowerHidden, lowerSize, lowerPosition } = useSidePanelContext();

	return (
		<Container size={lowerSize} position={lowerPosition}>
			<TitleBar caption="Traceback" hidden={lowerHidden} toggleHidden={() => setLowerHidden(!lowerHidden)} />
		</Container>
	);
}

export default withHooksPure(Traceback);

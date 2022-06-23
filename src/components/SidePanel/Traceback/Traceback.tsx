import Container from "components/Container";
import Roact from "@rbxts/roact";
import TitleBar from "../components/TitleBar";
import { pure } from "@rbxts/roact-hooked";
import { useSidePanelContext } from "../use-side-panel-context";

function Traceback() {
	const { lowerHidden, setLowerHidden, lowerSize, lowerPosition } = useSidePanelContext();

	return (
		<Container size={lowerSize} position={lowerPosition}>
			<TitleBar caption="Traceback" hidden={lowerHidden} toggleHidden={() => setLowerHidden(!lowerHidden)} />
		</Container>
	);
}

export default pure(Traceback);

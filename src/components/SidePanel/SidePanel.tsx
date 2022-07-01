import Container from "components/Container";
import FunctionTree from "./FunctionTree";
import Roact from "@rbxts/roact";
import Traceback from "./Traceback";
import { SIDE_PANEL_WIDTH } from "constants";
import { SidePanelContext } from "./use-side-panel-context";
import { useBinding, useMemo, useState, withHooksPure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

const MIN_PANEL_HEIGHT = 40;

function SidePanel() {
	const [lowerHeight, setLowerHeight] = useBinding(200);
	const [lowerHidden, setLowerHidden] = useState(false);
	const [upperHidden, setUpperHidden] = useState(false);

	const lowerAnim = useSpring(lowerHidden ? 1 : 0, { frequency: 8 });
	const upperAnim = useSpring(upperHidden ? 1 : 0, { frequency: 8 });

	const lowerSize = useMemo(
		() =>
			Roact.joinBindings([lowerHeight, lowerAnim, upperAnim]).map(([height, n, ftn]) => {
				const lowerShown = new UDim2(1, 0, 0, height);
				const lowerHidden = new UDim2(1, 0, 0, MIN_PANEL_HEIGHT);
				const upperHidden = new UDim2(1, 0, 1, -MIN_PANEL_HEIGHT);
				return lowerShown.Lerp(upperHidden, ftn).Lerp(lowerHidden, n);
			}),
		[],
	);

	const lowerPosition = useMemo(
		() =>
			Roact.joinBindings([lowerHeight, lowerAnim, upperAnim]).map(([height, n, ftn]) => {
				const lowerShown = new UDim2(0, 0, 1, -height);
				const lowerHidden = new UDim2(0, 0, 1, -MIN_PANEL_HEIGHT);
				const upperHidden = new UDim2(0, 0, 0, MIN_PANEL_HEIGHT);
				return lowerShown.Lerp(lowerHidden, n).Lerp(upperHidden, ftn);
			}),
		[],
	);

	const upperSize = useMemo(
		() =>
			Roact.joinBindings([lowerHeight, upperAnim, lowerAnim]).map(([height, n, tn]) => {
				const upperShown = new UDim2(1, 0, 1, -height);
				const upperHidden = new UDim2(1, 0, 0, MIN_PANEL_HEIGHT);
				const lowerHidden = new UDim2(1, 0, 1, -MIN_PANEL_HEIGHT);
				return upperShown.Lerp(lowerHidden, tn).Lerp(upperHidden, n);
			}),
		[],
	);

	return (
		<SidePanelContext.Provider
			value={{
				upperHidden,
				upperSize,
				setUpperHidden,
				lowerHidden,
				lowerSize,
				lowerPosition,
				setLowerHidden,
				setLowerHeight,
			}}
		>
			<Container
				anchorPoint={new Vector2(1, 0)}
				size={new UDim2(0, SIDE_PANEL_WIDTH, 1, -84)}
				position={new UDim2(1, 0, 0, 84)}
			>
				<FunctionTree />
				<Traceback />
			</Container>
		</SidePanelContext.Provider>
	);
}

export default withHooksPure(SidePanel);

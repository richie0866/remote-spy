import Container from "components/Container";
import Roact from "@rbxts/roact";
import { SIDE_PANEL_WIDTH } from "constants/app";
import { SidePanelContext } from "./use-side-panel-context";
import { pure, useBinding, useMemo, useState } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

const MIN_PANEL_HEIGHT = 40;

interface Props extends Roact.PropsWithChildren {}

function SidePanel({ [Roact.Children]: children }: Props) {
	const [lowerHeight, setLowerHeight] = useBinding(200);
	const [lowerHidden, setLowerHidden] = useState(false);
	const [upperHidden, setUpperHidden] = useState(false);

	const lowerAnimation = useSpring(lowerHidden ? 1 : 0, { frequency: 8 });
	const upperAnimation = useSpring(upperHidden ? 1 : 0, { frequency: 8 });

	const lowerSize = useMemo(
		() =>
			Roact.joinBindings([lowerHeight, lowerAnimation, upperAnimation]).map(([height, n, ftn]) => {
				const lowerShown = new UDim2(1, 0, 0, height);
				const lowerHidden = new UDim2(1, 0, 0, MIN_PANEL_HEIGHT);
				const upperHidden = new UDim2(1, 0, 1, -MIN_PANEL_HEIGHT);
				return lowerShown.Lerp(upperHidden, ftn).Lerp(lowerHidden, n);
			}),
		[],
	);

	const lowerPosition = useMemo(
		() =>
			Roact.joinBindings([lowerHeight, lowerAnimation, upperAnimation]).map(([height, n, ftn]) => {
				const lowerShown = new UDim2(0, 0, 1, -height);
				const lowerHidden = new UDim2(0, 0, 1, -MIN_PANEL_HEIGHT);
				const upperHidden = new UDim2(0, 0, 0, MIN_PANEL_HEIGHT);
				return lowerShown.Lerp(lowerHidden, n).Lerp(upperHidden, ftn);
			}),
		[],
	);

	const upperSize = useMemo(
		() =>
			Roact.joinBindings([lowerHeight, upperAnimation, lowerAnimation]).map(([height, n, tn]) => {
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
				{children}
			</Container>
		</SidePanelContext.Provider>
	);
}

export default pure(SidePanel);
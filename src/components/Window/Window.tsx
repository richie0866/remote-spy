import Roact from "@rbxts/roact";
import { useBinding, useMemo, useState, withHooksPure } from "@rbxts/roact-hooked";
import { useSpring, useViewportSize } from "@rbxts/roact-hooked-plus";
import Container from "components/Container";
import applyUDim2 from "util/applyUDim2";
import { lerp } from "util/numberUtil";
import withCollection from "util/withCollection";
import { WindowContext } from "./useWindowContext";
import WindowDropShadow from "./WindowDropShadow";
import WindowPaint from "./WindowPaint";
import WindowResizable from "./WindowResizable";
import WindowTitleBar from "./WindowTitleBar";

interface WindowProps extends Roact.PropsWithChildren {
	initialSize: UDim2;
	initialPosition: UDim2;
}

function Window({ initialSize, initialPosition, [Roact.Children]: children }: WindowProps) {
	const viewportSize = useViewportSize();

	const [size, setSize] = useBinding(applyUDim2(viewportSize.getValue(), initialSize));
	const [position, setPosition] = useBinding(applyUDim2(viewportSize.getValue(), initialPosition));

	const [maximized, setMaximized] = useState(false);

	const maximizedSpring = useSpring(maximized ? 1 : 0, { frequency: 6 });
	const sizeBindings = useMemo(() => Roact.joinBindings({ size, viewportSize, a: maximizedSpring }), []);
	const positionBindings = useMemo(() => Roact.joinBindings({ position, a: maximizedSpring }), []);

	const contextValue = useMemo(
		() => ({ size, position, maximized, setSize, setPosition, setMaximized }),
		[maximized],
	);

	return (
		<WindowContext.Provider value={contextValue}>
			<Container
				size={sizeBindings.map(
					({ size, viewportSize, a }) =>
						new UDim2(
							0,
							math.round(lerp(size.X, viewportSize.X, a)),
							0,
							math.round(lerp(size.Y, viewportSize.Y, a)),
						),
				)}
				position={positionBindings.map(
					({ position, a }) =>
						new UDim2(0, math.round(position.X * (1 - a)), 0, math.round(position.Y * (1 - a))),
				)}
			>
				{children}
			</Container>
		</WindowContext.Provider>
	);
}

export default withCollection(withHooksPure(Window), {
	Paint: WindowPaint,
	DropShadow: WindowDropShadow,
	Resizable: WindowResizable,
	TitleBar: WindowTitleBar,
});

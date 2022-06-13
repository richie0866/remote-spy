import Roact from "@rbxts/roact";
import { WindowContext } from "./use-window-context";
import { pure, useBinding, useMemo, useState } from "@rbxts/roact-hooked";
import { useSpring, useViewportSize } from "@rbxts/roact-hooked-plus";

interface Props extends Roact.PropsWithChildren {
	initialSize: UDim2;
	initialPosition: UDim2;
}

const apply = (v2: Vector2, udim: UDim2) =>
	new Vector2(v2.X * udim.X.Scale + udim.X.Offset, v2.Y * udim.Y.Scale + udim.Y.Offset);

function Window({ initialSize, initialPosition, [Roact.Children]: children }: Props) {
	const viewportSize = useViewportSize();
	const initialSizeVec = useMemo(() => apply(viewportSize.getValue(), initialSize), []);
	const initialPositionVec = useMemo(() => apply(viewportSize.getValue(), initialPosition), []);

	const [size, setSize] = useBinding(initialSizeVec);
	const [position, setPosition] = useBinding(initialPositionVec);
	const [maximized, setMaximized] = useState(false);

	const maximizeAnimation = useSpring(maximized ? 1 : 0, { frequency: 8 });

	return (
		<WindowContext.Provider value={{ size, setSize, position, setPosition, maximized, setMaximized }}>
			<frame
				BackgroundTransparency={1}
				Size={Roact.joinBindings({ size, viewportSize, maximizeAnimation }).map(
					({ size, viewportSize, maximizeAnimation }) =>
						new UDim2(0, size.X, 0, size.Y).Lerp(
							new UDim2(0, viewportSize.X, 0, viewportSize.Y),
							maximizeAnimation,
						),
				)}
				Position={Roact.joinBindings({ position, maximizeAnimation }).map(
					({ position, maximizeAnimation }) =>
						new UDim2(0, position.X * (1 - maximizeAnimation), 0, position.Y * (1 - maximizeAnimation)),
				)}
			>
				<uicorner CornerRadius={new UDim(0, 8)} />
				<>{children}</>
			</frame>
		</WindowContext.Provider>
	);
}

export default pure(Window);

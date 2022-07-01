import Roact from "@rbxts/roact";
import { WindowContext } from "./use-window-context";
import { lerp } from "utils/number-util";
import { useBinding, useMemo, useState, withHooksPure } from "@rbxts/roact-hooked";
import { useSpring, useViewportSize } from "@rbxts/roact-hooked-plus";

interface Props extends Roact.PropsWithChildren {
	initialSize: UDim2;
	initialPosition: UDim2;
}

const apply = (v2: Vector2, udim: UDim2) =>
	new Vector2(v2.X * udim.X.Scale + udim.X.Offset, v2.Y * udim.Y.Scale + udim.Y.Offset);

function Window({ initialSize, initialPosition, [Roact.Children]: children }: Props) {
	const viewportSize = useViewportSize();
	const [size, setSize] = useBinding(apply(viewportSize.getValue(), initialSize));
	const [position, setPosition] = useBinding(apply(viewportSize.getValue(), initialPosition));

	const [maximized, setMaximized] = useState(false);
	const maximizeAnim = useSpring(maximized ? 1 : 0, { frequency: 6 });

	return (
		<WindowContext.Provider value={{ size, setSize, position, setPosition, maximized, setMaximized }}>
			<frame
				BackgroundTransparency={1}
				Size={Roact.joinBindings({ size, viewportSize, maximizeAnim }).map(
					({ size, viewportSize, maximizeAnim }) =>
						new UDim2(
							0,
							math.round(lerp(size.X, viewportSize.X, maximizeAnim)),
							0,
							math.round(lerp(size.Y, viewportSize.Y, maximizeAnim)),
						),
				)}
				Position={Roact.joinBindings({ position, maximizeAnim }).map(
					({ position, maximizeAnim }) =>
						new UDim2(
							0,
							math.round(position.X * (1 - maximizeAnim)),
							0,
							math.round(position.Y * (1 - maximizeAnim)),
						),
				)}
			>
				<uicorner CornerRadius={new UDim(0, 8)} />
				<>{children}</>
			</frame>
		</WindowContext.Provider>
	);
}

export default withHooksPure(Window);

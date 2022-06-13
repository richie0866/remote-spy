import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

interface Props extends Roact.PropsWithChildren {}

function WindowMask({ [Roact.Children]: children }: Props) {
	return (
		<canvasgroup ClipsDescendants Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<uicorner CornerRadius={new UDim(0, 8)} />
			{children}
		</canvasgroup>
	);
}

export default pure(WindowMask);

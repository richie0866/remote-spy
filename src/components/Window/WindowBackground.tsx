import Container from "components/Container";
import Roact from "@rbxts/roact";

interface Props extends Roact.PropsWithChildren {
	background?: Color3;
	transparency?: number;
}

export default function WindowBackground({
	background = Color3.fromHex("#202020"),
	transparency = 0.2,
	[Roact.Children]: children,
}: Props) {
	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundColor3={background}
			BackgroundTransparency={transparency}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			{children}
			<Container>
				<uicorner CornerRadius={new UDim(0, 8)} />
				<uistroke Color={Color3.fromHex("#606060")} Transparency={0.5} Thickness={1} />
			</Container>
		</frame>
	);
}

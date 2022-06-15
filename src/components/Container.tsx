import Roact from "@rbxts/roact";

export interface Props extends Roact.PropsWithChildren {
	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
	order?: number | Roact.Binding<number>;
	clipChildren?: boolean | Roact.Binding<boolean>;
}

export default function Container({
	size = new UDim2(1, 0, 1, 0),
	position,
	anchorPoint,
	order,
	clipChildren,
	[Roact.Children]: children,
}: Props) {
	return (
		<frame
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			LayoutOrder={order}
			ClipsDescendants={clipChildren}
			BackgroundTransparency={1}
		>
			{children}
		</frame>
	);
}

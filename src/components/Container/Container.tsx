import Roact from "@rbxts/roact";

interface ContainerProps extends Roact.PropsWithChildren {
	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
	order?: number | Roact.Binding<number>;
	clipsDescendants?: boolean | Roact.Binding<boolean>;
}

export default function Container(props: ContainerProps) {
	return (
		<frame
			Size={props.size || new UDim2(1, 0, 1, 0)}
			Position={props.position}
			AnchorPoint={props.anchorPoint}
			LayoutOrder={props.order}
			ClipsDescendants={props.clipsDescendants}
			BackgroundTransparency={1}
		>
			{props[Roact.Children]}
		</frame>
	);
}

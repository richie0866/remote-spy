import Roact from "@rbxts/roact";

interface ButtonIconProps extends Roact.PropsWithChildren {
	icon: string | Roact.Binding<string>;
	color?: Color3 | Roact.Binding<Color3>;
	transparency?: number | Roact.Binding<number>;
	scaleType?: Roact.InferEnumNames<Enum.ScaleType>;
	sliceCenter?: Rect | Roact.Binding<Rect>;
	size: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
}

export default function ButtonIcon(props: ButtonIconProps) {
	return (
		<imagelabel
			Image={props.icon}
			ImageColor3={props.color}
			ImageTransparency={props.transparency}
			SliceCenter={props.sliceCenter}
			ScaleType={props.scaleType}
			Size={props.size}
			Position={props.position || new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={props.anchorPoint || new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			{props[Roact.Children]}
		</imagelabel>
	);
}

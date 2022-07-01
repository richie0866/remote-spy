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

export default function ButtonIcon({
	icon,
	scaleType,
	sliceCenter,
	transparency,
	color,
	size,
	position = new UDim2(0.5, 0, 0.5, 0),
	anchorPoint = new Vector2(0.5, 0.5),
	[Roact.Children]: children,
}: ButtonIconProps) {
	return (
		<imagelabel
			Image={icon}
			ImageColor3={color}
			ImageTransparency={transparency}
			SliceCenter={sliceCenter}
			ScaleType={scaleType}
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			BackgroundTransparency={1}
		>
			{children}
		</imagelabel>
	);
}

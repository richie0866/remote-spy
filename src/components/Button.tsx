import Roact from "@rbxts/roact";

interface Props extends Roact.PropsWithChildren {
	onClick?: (rbx: TextButton, inputObject: InputObject, clickCount: number) => void;
	onHover?: (rbx: TextButton, x: number, y: number) => void;
	onHoverEnd?: (rbx: TextButton, x: number, y: number) => void;
	onPress?: (rbx: TextButton, x: number, y: number) => void;
	onRelease?: (rbx: TextButton, x: number, y: number) => void;
	active?: boolean | Roact.Binding<boolean>;
	background?: Color3 | Roact.Binding<Color3>;
	transparency?: number | Roact.Binding<number>;
	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
	cornerRadius?: UDim | Roact.Binding<UDim>;
	zIndex?: number | Roact.Binding<number>;
	layoutOrder?: number | Roact.Binding<number>;
}

export default function Button(props: Props) {
	return (
		<textbutton
			Event={{
				Activated: props.onClick,
				MouseButton1Down: props.onPress,
				MouseButton1Up: props.onRelease,
				MouseEnter: props.onHover,
				MouseLeave: props.onHoverEnd,
			}}
			Active={props.active}
			BackgroundColor3={props.background ?? new Color3(1, 1, 1)}
			BackgroundTransparency={props.transparency ?? 1}
			Size={props.size}
			Position={props.position}
			AnchorPoint={props.anchorPoint}
			ZIndex={props.zIndex}
			LayoutOrder={props.layoutOrder}
			Text=""
			BorderSizePixel={0}
			AutoButtonColor={false}
		>
			{props[Roact.Children]}
			{props.cornerRadius && <uicorner CornerRadius={props.cornerRadius} />}
		</textbutton>
	);
}

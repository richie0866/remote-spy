import Roact from "@rbxts/roact";

interface WindowDropShadowProps extends Roact.PropsWithChildren {
	image?: string;
	slizeCenter?: Rect;
}

export default function WindowDropShadow({
	image = "rbxassetid://9886919127",
	slizeCenter = new Rect(113, 113, 113, 113),
	[Roact.Children]: children,
}: WindowDropShadowProps) {
	return (
		<imagelabel
			Image={image}
			ScaleType="Slice"
			SliceCenter={slizeCenter}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(1, 110, 1, 110)}
			Position={new UDim2(0.5, 0, 0.5, 24)}
			BackgroundTransparency={1}
		>
			{children}
		</imagelabel>
	);
}

import Roact from "@rbxts/roact";

interface Props {
	text: string;
	description: string;
	wrapped?: boolean;
	richText?: boolean;
}

export default function RowCaption({ text, description, wrapped, richText }: Props) {
	return (
		<textlabel
			Text={text}
			Font="Gotham"
			TextColor3={new Color3(1, 1, 1)}
			TextSize={11}
			AutomaticSize="Y"
			Size={new UDim2(1, 50, 0, 23)}
			TextXAlignment="Left"
			TextYAlignment="Top"
			BackgroundTransparency={1}
		>
			<textlabel
				RichText={richText}
				Text={description}
				Font="Gotham"
				TextColor3={new Color3(1, 1, 1)}
				TextSize={11}
				TextTransparency={0.3}
				TextWrapped={wrapped}
				AutomaticSize="Y"
				Size={new UDim2(1, -114, 0, 0)}
				Position={new UDim2(0, 114, 0, 0)}
				TextXAlignment="Left"
				TextYAlignment="Top"
				BackgroundTransparency={1}
			>
				<uipadding PaddingBottom={new UDim(0, 6)} />
			</textlabel>

			<uipadding PaddingTop={new UDim(0, 4)} />
		</textlabel>
	);
}

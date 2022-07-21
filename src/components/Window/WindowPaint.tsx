import Roact from "@rbxts/roact";
import Container from "components/Container";

export default function WindowPaint() {
	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundColor3={Color3.fromHex("#FFFFFF")}
			BackgroundTransparency={0.9}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={new UDim(0, 11)} />

			<frame
				BackgroundColor3={Color3.fromHex("#1C1F28")}
				BackgroundTransparency={0.4}
				Size={new UDim2(1, 0, 1, 0)}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 11)} />
			</frame>

			<frame
				BackgroundColor3={Color3.fromHex("#FFFFFF")}
				BackgroundTransparency={0.4}
				Size={new UDim2(1, 0, 1, 0)}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 11)} />
				<uigradient
					Color={new ColorSequence(Color3.fromHex("#252221"), Color3.fromHex("#171515"))}
					Rotation={90}
				/>
			</frame>

			<imagelabel
				Image="rbxassetid://9968344105"
				ImageTransparency={0.98}
				ScaleType="Tile"
				TileSize={new UDim2(0, 128, 0, 128)}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
			>
				<uicorner CornerRadius={new UDim(0, 11)} />
			</imagelabel>

			<imagelabel
				Image="rbxassetid://9968344227"
				ImageTransparency={0.85}
				ScaleType="Tile"
				TileSize={new UDim2(0, 128, 0, 128)}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
			>
				<uicorner CornerRadius={new UDim(0, 11)} />
			</imagelabel>

			<Container>
				<uicorner CornerRadius={new UDim(0, 11)} />
				<uistroke Color={Color3.fromHex("#606060")} Transparency={0.5} Thickness={1} />
			</Container>
		</frame>
	);
}

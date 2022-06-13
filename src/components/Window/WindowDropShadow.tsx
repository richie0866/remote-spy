import Roact from "@rbxts/roact";
import { WindowAssets } from "./assets";

const IMAGE_SIZE = new Vector2(226, 226);

export default function WindowDropShadow() {
	return (
		<imagelabel
			Image={WindowAssets.DropShadow}
			ScaleType="Slice"
			SliceCenter={new Rect(IMAGE_SIZE.div(2), IMAGE_SIZE.div(2))}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(1, 110, 1, 110)}
			Position={new UDim2(0.5, 0, 0.5, 24)}
			BackgroundTransparency={1}
		/>
	);
}

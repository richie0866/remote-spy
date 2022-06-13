import Roact from "@rbxts/roact";
import { SIDE_PANEL_WIDTH } from "constants/app";
import { pure } from "@rbxts/roact-hooked";

function TabView() {
	return (
		<frame
			BackgroundTransparency={0.7}
			BackgroundColor3={Color3.fromHex("#424242")}
			Size={new UDim2(1, -SIDE_PANEL_WIDTH - 5, 1, -129)}
			Position={new UDim2(0, 5, 0, 124)}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
		</frame>
	);
}

export default pure(TabView);

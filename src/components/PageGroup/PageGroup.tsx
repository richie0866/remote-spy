import Page from "./Page";
import Roact from "@rbxts/roact";
import { SIDE_PANEL_WIDTH } from "constants/app";
import { arrayToMap } from "@rbxts/roact-hooked-plus";
import { pure } from "@rbxts/roact-hooked";
import { useTabs } from "components/TabGroup";

function PageGroup() {
	const tabs = useTabs();

	return (
		<frame
			BackgroundTransparency={0.7}
			BackgroundColor3={Color3.fromHex("#424242")}
			Size={new UDim2(1, -SIDE_PANEL_WIDTH - 5, 1, -129)}
			Position={new UDim2(0, 5, 0, 124)}
			ClipsDescendants
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			{arrayToMap(tabs, (tab) => [tab.id, <Page id={tab.id} />])}
		</frame>
	);
}

export default pure(PageGroup);

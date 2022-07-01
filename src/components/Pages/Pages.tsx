import Page from "./Page";
import Roact from "@rbxts/roact";
import { SIDE_PANEL_WIDTH } from "constants";
import { arrayToMap } from "@rbxts/roact-hooked-plus";
import { selectTabs } from "reducers/tab-group";
import { useRootSelector } from "hooks/use-root-store";
import { withHooksPure } from "@rbxts/roact-hooked";

function Pages() {
	const tabs = useRootSelector(selectTabs);

	return (
		<frame
			BackgroundTransparency={0.96}
			BackgroundColor3={Color3.fromHex("#FFFFFF")}
			Size={new UDim2(1, -SIDE_PANEL_WIDTH - 5, 1, -129)}
			Position={new UDim2(0, 5, 0, 124)}
			ClipsDescendants
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			{arrayToMap(tabs, (tab) => [tab.id, <Page id={tab.id} />])}
		</frame>
	);
}

export default withHooksPure(Pages);

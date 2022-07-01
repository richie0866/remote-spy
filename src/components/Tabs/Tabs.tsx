import Roact from "@rbxts/roact";
import Tab from "./Tab";
import { SIDE_PANEL_WIDTH } from "constants";
import { arrayToMap } from "@rbxts/roact-hooked-plus";
import { getTabWidth, selectTabs } from "reducers/tab-group";
import { useBinding, useMemo, withHooksPure } from "@rbxts/roact-hooked";
import { useRootSelector } from "hooks/use-root-store";

function Tabs() {
	const tabs = useRootSelector(selectTabs);
	const [canvasPosition, setCanvasPosition] = useBinding(new Vector2());

	const totalWidth = useMemo(() => {
		return tabs.reduce((acc, tab) => acc + getTabWidth(tab), 0);
	}, tabs);

	return (
		<scrollingframe
			Change={{
				CanvasPosition: (rbx) => setCanvasPosition(rbx.CanvasPosition),
			}}
			CanvasSize={new UDim2(0, totalWidth + 100, 0, 0)}
			ScrollingDirection="X"
			HorizontalScrollBarInset="None"
			ScrollBarThickness={0}
			Size={new UDim2(1, -SIDE_PANEL_WIDTH - 5, 0, 35)}
			Position={new UDim2(0, 5, 0, 89)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			<uipadding PaddingLeft={new UDim(0, 12)} />
			{arrayToMap(tabs, (tab) => [tab.id, <Tab tab={tab} canvasPosition={canvasPosition} />])}
		</scrollingframe>
	);
}

export default withHooksPure(Tabs);

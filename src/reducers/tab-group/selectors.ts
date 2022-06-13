import { RootState } from "reducers";
import { TabGroupStyle, getTabOffset } from "./utils";
import { createSelector } from "@rbxts/roselect";

export const selectTabGroup = (state: RootState) => state.tabGroup;
export const selectTabs = (state: RootState) => state.tabGroup.tabs;
export const selectActiveTab = (state: RootState) => state.tabGroup.activeTab;
export const selectTabCount = (state: RootState) => state.tabGroup.tabs.size();

export const selectTab = (state: RootState, id: string) => state.tabGroup.tabs.find((tab) => tab.id === id);
export const selectTabOrder = (state: RootState, id: string) => state.tabGroup.tabs.findIndex((tab) => tab.id === id);
export const selectTabIsActive = (state: RootState, id: string) => state.tabGroup.activeTab === id;

export const makeSelectTabsBefore = () => {
	const selectTabsBefore = createSelector([selectTabs, selectTabOrder], (tabs, order) => {
		return tabs.filter((_, index) => index < order);
	});

	return selectTabsBefore;
};

export const makeSelectTabOffset = () => {
	const selectTabOffset = createSelector(
		[makeSelectTabsBefore(), selectTab, (_1, _2, style: TabGroupStyle) => style],
		(tabs, tab, style) => {
			if (!tab) {
				return 0;
			}
			return getTabOffset(tabs, tab, style);
		},
	);

	return selectTabOffset;
};

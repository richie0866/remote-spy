import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";
import { getTabOffset } from "./utils";

export const selectTabGroup = (state: RootState) => state.tabGroup;
export const selectTabs = (state: RootState) => state.tabGroup.tabs;
export const selectActiveTabId = (state: RootState) => state.tabGroup.activeTab;
export const selectTabCount = (state: RootState) => state.tabGroup.tabs.size();
export const selectActiveTab = (state: RootState) => selectTab(state, state.tabGroup.activeTab);

export const selectTab = (state: RootState, id: string) => state.tabGroup.tabs.find((tab) => tab.id === id);
export const selectTabOrder = (state: RootState, id: string) => state.tabGroup.tabs.findIndex((tab) => tab.id === id);
export const selectActiveTabOrder = (state: RootState) =>
	state.tabGroup.tabs.findIndex((tab) => tab.id === state.tabGroup.activeTab);
export const selectTabIsActive = (state: RootState, id: string) => state.tabGroup.activeTab === id;
export const selectTabType = (state: RootState, id: string) => selectTab(state, id)?.type;

export const makeSelectTabsBefore = () => {
	const selectTabsBefore = createSelector([selectTabs, selectTabOrder], (tabs, order) => {
		return tabs.filter((_, index) => index < order);
	});

	return selectTabsBefore;
};

export const makeSelectTabOffset = () => {
	const selectTabOffset = createSelector([makeSelectTabsBefore(), selectTab], (tabs, tab) => {
		if (!tab) {
			return 0;
		}
		return getTabOffset(tabs, tab);
	});

	return selectTabOffset;
};

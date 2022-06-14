import { TabGroupActions } from "./actions";
import { TabGroupState, TabType } from "./model";
import { createTabColumn } from "./utils";

const initialState: TabGroupState = {
	tabs: [createTabColumn("home", "Home", TabType.Home, false)],
	activeTab: "home",
};

export default function tabGroupReducer(state = initialState, action: TabGroupActions): TabGroupState {
	switch (action.type) {
		case "PUSH_TAB":
			return {
				...state,
				tabs: [...state.tabs, action.tab],
			};
		case "DELETE_TAB": {
			const index = state.tabs.findIndex((tab) => tab.id === action.id);
			return {
				tabs: state.tabs.filter((tab) => tab.id !== action.id),
				activeTab:
					state.activeTab === action.id
						? state.tabs[index - 1]?.id ?? state.tabs[index + 1].id
						: state.activeTab,
			};
		}
		case "MOVE_TAB": {
			const tab = state.tabs.find((tab) => tab.id === action.id)!;
			const from = state.tabs.indexOf(tab);

			const tabs = table.clone(state.tabs);
			tabs.remove(from);
			tabs.insert(action.to, tab);

			return {
				...state,
				tabs,
			};
		}
		case "SET_ACTIVE_TAB":
			return {
				...state,
				activeTab: action.id,
			};
		default:
			return state;
	}
}

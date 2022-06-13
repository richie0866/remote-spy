import { TabGroupAction } from "./actions";
import { TabGroupState } from "./model";

const initialState: TabGroupState = {
	tabs: [
		{ id: "__home", caption: "Home", icon: "rbxassetid://9896611868", canClose: false },
		{ id: "1", caption: "SendMessage", icon: "rbxassetid://9896665149", canClose: true },
		{ id: "2", caption: "IsMessaging", icon: "rbxassetid://9896665330", canClose: true },
		{ id: "3", caption: "ChatModule", icon: "rbxassetid://9896665034", canClose: true },
		{ id: "4", caption: "UpdateCameraLook", icon: "rbxassetid://9896665149", canClose: true },
		{ id: "5", caption: "Fire", icon: "rbxassetid://9896665330", canClose: true },
		{ id: "6", caption: "IsFiring", icon: "rbxassetid://9896665034", canClose: true },
		{ id: "7", caption: "TryReload", icon: "rbxassetid://9896665149", canClose: true },
		{ id: "8", caption: "Force", icon: "rbxassetid://9896665330", canClose: true },
	],
	activeTab: "__home",
};

export default function tabGroupReducer(state = initialState, action: TabGroupAction): TabGroupState {
	switch (action.type) {
		case "PUSH_TAB":
			return {
				...state,
				tabs: [...state.tabs, action.tab],
			};
		case "DELETE_TAB":
			return {
				tabs: state.tabs.filter((tab) => tab.id !== action.id),
				activeTab: state.activeTab === action.id ? "" : state.activeTab,
			};
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

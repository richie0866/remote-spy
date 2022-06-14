import { ActionBarActions } from "./actions";
import { ActionBarState } from "./model";

const initialState: ActionBarState = {
	actions: {
		navigatePrevious: { id: "navigatePrevious", disabled: true, active: false },
		navigateNext: { id: "navigateNext", disabled: false, active: false },
		copy: { id: "copy", disabled: true, active: false },
		delete: { id: "delete", disabled: true, active: false },
		find: { id: "find", disabled: false, active: false },
		copyPath: { id: "copyPath", disabled: false, active: false },
	},
	selectedRemoteId: "",
	selectedSignalId: "",
};

export default function actionBarReducer(state = initialState, action: ActionBarActions): ActionBarState {
	switch (action.type) {
		case "SET_ACTION_DISABLED":
			return {
				...state,
				actions: {
					...state.actions,
					[action.id]: {
						...state.actions[action.id],
						disabled: action.disabled,
					},
				},
			};
		case "ACTIVATE_ACTION":
			return {
				...state,
				actions: {
					...state.actions,
					[action.id]: {
						...state.actions[action.id],
						active: true,
					},
				},
			};
		case "DEACTIVATE_ACTION":
			return {
				...state,
				actions: {
					...state.actions,
					[action.id]: {
						...state.actions[action.id],
						active: false,
					},
				},
			};
		case "SET_SELECTED_REMOTE_ID":
			return {
				...state,
				selectedRemoteId: action.remoteId,
			};
		case "SET_SELECTED_SIGNAL_ID":
			return {
				...state,
				selectedSignalId: action.signalId,
			};
		default:
			return state;
	}
}

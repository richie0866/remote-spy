import { ActionBarActions } from "./actions";
import { ActionBarState } from "./model";

const initialState: ActionBarState = {
	actions: {
		close: { id: "close", disabled: false, active: false },
		navigatePrevious: { id: "navigatePrevious", disabled: true, active: false },
		navigateNext: { id: "navigateNext", disabled: false, active: false },
		copy: { id: "copy", disabled: true, active: false },
		save: { id: "save", disabled: true, active: false },
		delete: { id: "delete", disabled: true, active: false },
		traceback: { id: "traceback", disabled: false, active: false },
		copyPath: { id: "copyPath", disabled: false, active: false },
	},
};

export default function actionBarReducer(state = initialState, action: ActionBarActions): ActionBarState {
	switch (action.type) {
		case "SET_ACTION_ENABLED":
			return {
				...state,
				actions: {
					...state.actions,
					[action.id]: {
						...state.actions[action.id],
						disabled: !action.enabled,
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
		default:
			return state;
	}
}

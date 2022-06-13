import { ActionBarStates } from "./model";

export function setActionDisabled(id: keyof ActionBarStates, disabled: boolean) {
	return {
		type: "SET_ACTION_DISABLED",
		id,
		disabled,
	} as const;
}

export function activateAction(id: keyof ActionBarStates) {
	return {
		type: "ACTIVATE_ACTION",
		id,
	} as const;
}

export type ActionBarActions = ReturnType<typeof setActionDisabled> | ReturnType<typeof activateAction>;

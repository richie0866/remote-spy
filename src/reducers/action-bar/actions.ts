import { ActionBarStates } from "./model";

export function setActionEnabled(id: keyof ActionBarStates, enabled: boolean) {
	return {
		type: "SET_ACTION_ENABLED",
		id,
		enabled,
	} as const;
}

export function activateAction(id: keyof ActionBarStates) {
	return {
		type: "ACTIVATE_ACTION",
		id,
	} as const;
}

export function deactivateAction(id: keyof ActionBarStates) {
	return {
		type: "DEACTIVATE_ACTION",
		id,
	} as const;
}

export type ActionBarActions =
	| ReturnType<typeof setActionEnabled>
	| ReturnType<typeof activateAction>
	| ReturnType<typeof deactivateAction>;

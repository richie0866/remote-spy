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

export function deactivateAction(id: keyof ActionBarStates) {
	return {
		type: "DEACTIVATE_ACTION",
		id,
	} as const;
}

export function setSelectedRemoteId(remoteId?: string) {
	return {
		type: "SET_SELECTED_REMOTE_ID",
		remoteId,
	} as const;
}

export function setSelectedSignalId(signalId?: string) {
	return {
		type: "SET_SELECTED_SIGNAL_ID",
		signalId,
	} as const;
}

export type ActionBarActions =
	| ReturnType<typeof setActionDisabled>
	| ReturnType<typeof activateAction>
	| ReturnType<typeof deactivateAction>
	| ReturnType<typeof setSelectedRemoteId>
	| ReturnType<typeof setSelectedSignalId>;

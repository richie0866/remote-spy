export interface ActionBarState {
	actions: ActionBarStates;
	selectedRemoteId?: string;
	selectedSignalId?: string;
}

export interface ActionBarStates {
	navigatePrevious: ActionState;
	navigateNext: ActionState;
	copy: ActionState;
	delete: ActionState;
	find: ActionState;
	copyPath: ActionState;
}

export interface ActionState {
	id: string;
	disabled: boolean;
	active: boolean;
}

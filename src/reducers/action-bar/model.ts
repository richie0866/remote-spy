export interface ActionBarState {
	actions: ActionBarStates;
	selectedRemoteId?: string;
	selectedSignalId?: string;
}

export interface ActionBarStates {
	close: ActionState;
	navigatePrevious: ActionState;
	navigateNext: ActionState;
	copy: ActionState;
	delete: ActionState;
	traceback: ActionState;
	copyPath: ActionState;
}

export interface ActionState {
	id: string;
	disabled: boolean;
	active: boolean;
}

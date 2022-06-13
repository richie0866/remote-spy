export interface ActionBarState {
	actions: ActionBarStates;
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

import { ActionBarStates } from "./model";
import { RootState } from "reducers";

export const selectActionBarState = (state: RootState) => state.actionBar.actions;
export const selectIsClosing = (state: RootState) => state.actionBar.actions.close.active;
export const selectActionById = (state: RootState, id: keyof ActionBarStates) => state.actionBar.actions[id];
export const selectActionIsActive = (state: RootState, id: keyof ActionBarStates) => state.actionBar.actions[id].active;
export const selectActionIsDisabled = (state: RootState, id: keyof ActionBarStates) =>
	state.actionBar.actions[id].disabled;

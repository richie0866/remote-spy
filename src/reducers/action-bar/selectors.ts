import { ActionBarStates } from "./model";
import { RootState } from "reducers";

export const selectActionBarState = (state: RootState) => state.actionBar.actions;
export const selectRemoteIdSelected = (state: RootState) => state.actionBar.selectedRemoteId;
export const selectSignalIdSelected = (state: RootState) => state.actionBar.selectedSignalId;

export const selectActionById = (state: RootState, id: keyof ActionBarStates) => state.actionBar.actions[id];
export const selectActionIsActive = (state: RootState, id: keyof ActionBarStates) => state.actionBar.actions[id].active;
export const selectActionIsDisabled = (state: RootState, id: keyof ActionBarStates) =>
	state.actionBar.actions[id].disabled;

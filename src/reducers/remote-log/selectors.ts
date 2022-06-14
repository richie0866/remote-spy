import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";

export const selectRemoteLogs = (state: RootState) => state.remoteLog.logs;
export const selectRemoteLog = (state: RootState, id: string) => state.remoteLog.logs.find((log) => log.id === id);

export const selectRemoteLogIds = createSelector([selectRemoteLogs], (logs) => logs.map((log) => log.id));

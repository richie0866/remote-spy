import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";

export const selectRemoteLogs = (state: RootState) => state.remoteLog.logs;
export const selectRemoteLogIds = createSelector([selectRemoteLogs], (logs) => logs.map((log) => log.id));

export const makeSelectRemoteLog = () =>
	createSelector([selectRemoteLogs, (_: unknown, id: string) => id], (logs, id) => logs.find((log) => log.id === id));
export const makeSelectRemoteLogOutgoing = () => createSelector([makeSelectRemoteLog()], (log) => log?.outgoing);
export const makeSelectRemoteLogObject = () => createSelector([makeSelectRemoteLog()], (log) => log?.object);
export const makeSelectRemoteLogType = () => createSelector([makeSelectRemoteLog()], (log) => log?.type);

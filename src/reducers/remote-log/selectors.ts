import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";

export const selectRemoteLogs = (state: RootState) => state.remoteLog.logs;
export const selectRemoteLogIds = createSelector([selectRemoteLogs], (logs) => logs.map((log) => log.id));
export const selectRemoteLogsOutgoing = (state: RootState) => state.remoteLog.logs.map((log) => log.outgoing);

export const selectRemoteIdSelected = (state: RootState) => state.remoteLog.remoteSelected;
export const selectSignalIdSelected = (state: RootState) => state.remoteLog.signalSelected;
export const selectSignalIdSelectedRemote = (state: RootState) => state.remoteLog.remoteForSignalSelected;

export const makeSelectRemoteLog = () =>
	createSelector([selectRemoteLogs, (_: unknown, id: string) => id], (logs, id) => logs.find((log) => log.id === id));
export const makeSelectRemoteLogOutgoing = () => createSelector([makeSelectRemoteLog()], (log) => log?.outgoing);
export const makeSelectRemoteLogObject = () => createSelector([makeSelectRemoteLog()], (log) => log?.object);
export const makeSelectRemoteLogType = () => createSelector([makeSelectRemoteLog()], (log) => log?.type);

const _selectOutgoing = makeSelectRemoteLogOutgoing();
export const selectSignalSelected = createSelector(
	[(state: RootState) => _selectOutgoing(state, selectSignalIdSelectedRemote(state) ?? ""), selectSignalIdSelected],
	(outgoing, id) => (outgoing && id !== undefined ? outgoing?.find((signal) => signal.id === id) : undefined),
);

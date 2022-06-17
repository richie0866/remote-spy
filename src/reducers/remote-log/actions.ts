import { OutgoingSignal, RemoteLog } from "./model";

export function pushRemoteLog(log: RemoteLog) {
	return { type: "PUSH_REMOTE_LOG", log } as const;
}

export function removeRemoteLog(id: string) {
	return { type: "REMOVE_REMOTE_LOG", id } as const;
}

export function pushOutgoingSignal(id: string, signal: OutgoingSignal) {
	return { type: "PUSH_OUTGOING_SIGNAL", id, signal } as const;
}

export function removeOutgoingSignal(id: string, signalId: string) {
	return { type: "REMOVE_OUTGOING_SIGNAL", id, signalId } as const;
}

export function clearOutgoingSignals(id: string) {
	return { type: "CLEAR_OUTGOING_SIGNALS", id } as const;
}

export function setRemoteSelected(id?: string) {
	return { type: "SET_REMOTE_SELECTED", id } as const;
}

export function setSignalSelected(remote: string, id?: string) {
	return { type: "SET_SIGNAL_SELECTED", remote, id } as const;
}

export function toggleSignalSelected(remote: string, id: string) {
	return { type: "TOGGLE_SIGNAL_SELECTED", remote, id } as const;
}

export type RemoteLogActions =
	| ReturnType<typeof pushRemoteLog>
	| ReturnType<typeof removeRemoteLog>
	| ReturnType<typeof pushOutgoingSignal>
	| ReturnType<typeof removeOutgoingSignal>
	| ReturnType<typeof clearOutgoingSignals>
	| ReturnType<typeof setRemoteSelected>
	| ReturnType<typeof setSignalSelected>
	| ReturnType<typeof toggleSignalSelected>;

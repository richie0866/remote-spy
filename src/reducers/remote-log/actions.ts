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

export type RemoteLogActions =
	| ReturnType<typeof pushRemoteLog>
	| ReturnType<typeof removeRemoteLog>
	| ReturnType<typeof pushOutgoingSignal>
	| ReturnType<typeof removeOutgoingSignal>;

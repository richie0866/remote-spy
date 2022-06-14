import { TabType } from "reducers/tab-group";

export interface RemoteLogState {
	logs: RemoteLog[];
}

export interface RemoteLog {
	id: string;
	object: RemoteEvent | RemoteFunction;
	type: TabType.Event | TabType.Function;
	outgoing: OutgoingSignal[];
}

export interface OutgoingSignal {
	id: string;
	args: Record<number, unknown>;
	caller: Callback;
	traceback: Callback[];
}

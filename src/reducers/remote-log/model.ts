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
	name: string;
	path: string;
	pathFmt: string;
	parameters: Record<number, unknown>;
	returns?: Record<number, unknown>;
	caller?: LocalScript | ModuleScript;
	callback: Callback;
	traceback: Callback[];
}

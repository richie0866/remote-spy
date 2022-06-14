import { OutgoingSignal, RemoteLog } from "./model";
import { TabType } from "reducers/tab-group";
import { getObjectId } from "utils/ids";

let nextId = 0;

export function createRemoteLog(object: RemoteEvent | RemoteFunction, signal?: OutgoingSignal): RemoteLog {
	const id = getObjectId(object);
	const remoteType = object.IsA("RemoteEvent") ? TabType.Event : TabType.Function;
	return { id, object, type: remoteType, outgoing: signal ? [signal] : [] };
}

export function createOutgoingSignal(
	args: Record<number, unknown>,
	caller: Callback,
	traceback: Callback[],
): OutgoingSignal {
	return { id: `signal-${nextId++}`, args, caller, traceback };
}

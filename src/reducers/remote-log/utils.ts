import { OutgoingSignal, RemoteLog } from "./model";
import { TabType } from "reducers/tab-group";
import { getDisplayPath, getInstanceId, getSafePath } from "utils/instance-util";

let nextId = 0;

export function createRemoteLog(object: RemoteEvent | RemoteFunction, signal?: OutgoingSignal): RemoteLog {
	const id = getInstanceId(object);
	const remoteType = object.IsA("RemoteEvent") ? TabType.Event : TabType.Function;
	return { id, object, type: remoteType, outgoing: signal ? [signal] : [] };
}

export function createOutgoingSignal(
	object: RemoteEvent | RemoteFunction,
	caller: LocalScript | ModuleScript | undefined,
	callback: Callback,
	traceback: Callback[],
	parameters: Record<number, unknown>,
	returns?: Record<number, unknown>,
): OutgoingSignal {
	return {
		name: object.Name,
		path: getDisplayPath(object),
		pathFmt: getSafePath(object),
		id: `signal-${nextId++}`,
		parameters,
		returns,
		caller,
		callback,
		traceback,
	};
}

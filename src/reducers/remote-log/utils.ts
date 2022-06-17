import { OutgoingSignal, RemoteLog } from "./model";
import { TabType } from "reducers/tab-group";
import { getInstanceId, getInstancePath } from "utils/instance-util";
import { stringifyFunctionSignature } from "utils/function-util";

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
		id: `signal-${nextId++}`,
		remote: object,
		remoteId: getInstanceId(object),
		name: object.Name,
		path: getInstancePath(object),
		pathFmt: getInstancePath(object),
		parameters,
		returns,
		caller,
		callback,
		traceback,
	};
}

export function stringifySignalTraceback(signal: OutgoingSignal) {
	const mapped = signal.traceback.map(stringifyFunctionSignature);
	const length = mapped.size();

	// Reverse order so that the remote caller is last.
	for (let i = 0; i < length / 2; i++) {
		const temp = mapped[i];
		mapped[i] = mapped[length - i - 1];
		mapped[length - i - 1] = temp;
	}

	// Highlight the remote caller.
	mapped[length - 1] = `→ ${mapped[length - 1]} ←`;

	return mapped;
}

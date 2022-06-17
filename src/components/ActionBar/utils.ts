import { OutgoingSignal, RemoteLog, stringifySignalTraceback } from "reducers/remote-log";
import { codifyTable } from "utils/codify";
import { describeFunction, stringifyFunctionSignature } from "utils/function-util";
import { getInstancePath } from "utils/instance-util";

const line = "-----------------------------------------------------";

export function stringifyRemote(remote: RemoteLog, filter?: (signal: OutgoingSignal) => boolean) {
	const lines = [];

	lines.push(`Remote name: ${remote.object.Name}`);
	lines.push(`Remote type: ${remote.object.ClassName}`);
	lines.push(`Remote location: ${getInstancePath(remote.object)}`);

	remote.outgoing.forEach((signal, index) => {
		if (filter ? filter(signal) : true) {
			lines.push(line + "\n" + stringifyOutgoingSignal(signal, index));
		}
	});

	return lines.join("\n");
}

export function stringifyOutgoingSignal(signal: OutgoingSignal, index?: number) {
	const lines = [];
	const description = describeFunction(signal.callback);

	if (index !== undefined) {
		lines.push(`(OUTGOING SIGNAL ${index + 1})`);
	}

	lines.push(`Calling script: ${signal.caller ? signal.caller.Name : "Not called from a script"}`);
	lines.push(`Remote name: ${signal.name}`);
	lines.push(`Remote location: ${signal.pathFmt}`);
	lines.push(`Remote parameters: ${codifyTable(signal.parameters)}`);
	lines.push(`Function signature: ${stringifyFunctionSignature(signal.callback)}`);
	lines.push(`Function source: ${description.source}`);
	lines.push("Function traceback:");

	for (const line of stringifySignalTraceback(signal)) {
		lines.push("	" + line);
	}

	return lines.join("\n");
}

export function codifyOutgoingSignal(signal: OutgoingSignal) {
	const lines = [];

	lines.push(`local remote = ${signal.pathFmt}`);
	lines.push(`local arguments = ${codifyTable(signal.parameters)}`);

	if (signal.remote.IsA("RemoteEvent")) {
		lines.push(`remote:FireServer(unpack(arguments))`);
	} else {
		lines.push(`local results = remote:InvokeServer(unpack(arguments))`);
	}

	return lines.join("\n\n");
}

interface FunctionDescription {
	name: string;
	source: string;
	parameters: number;
	variadic: boolean;
}

export function describeFunction(fn: number | Callback): FunctionDescription {
	if (debug.getinfo) {
		const info = debug.getinfo(fn);
		return {
			name: info.name === "" || info.name === undefined ? "(anonymous)" : info.name,
			source: info.short_src,
			parameters: info.numparams ?? 0,
			variadic: info.is_vararg === 1 ? true : false,
		};
	}

	const [name] = debug.info(fn, "n");
	const [source] = debug.info(fn, "s");
	const [parameters, variadic] = debug.info(fn, "a");

	return {
		name: name === "" || name === undefined ? "(anonymous)" : name,
		source,
		parameters,
		variadic,
	};
}

export function getFunctionScript(fn: number | Callback): LocalScript | ModuleScript | undefined {
	return rawget(getfenv(fn as number), "script") as never;
}

export function stringifyFunctionSignature(fn: number | Callback) {
	const description = describeFunction(fn);
	const params = [];

	for (let i = 0; i < description.parameters; i++) {
		params.push(string.char(string.byte("A")[0] + i));
	}

	if (description.variadic) {
		params.push("...");
	}

	return `${description.name}(${params.join(", ")})`;
}

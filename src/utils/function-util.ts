export function describeFunction(fn: number | Callback): ChunkInfo {
	if (debug.getinfo) {
		return debug.getinfo(fn);
	}
	return {
		name: "placeholder",
		source: "placeholder",
		short_src: "placeholder",
		what: "Lua",
		currentline: math.random(1, 10),
		nups: 0,
		numparams: 2,
		is_vararg: 1,
		func: typeIs(fn, "number") ? () => {} : fn,
	};
}

export function getFunctionScript(fn: number | Callback): LocalScript | ModuleScript | undefined {
	return rawget(getfenv(fn as number), "script") as never;
}

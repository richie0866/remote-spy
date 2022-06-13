export function setTracebackCallStack(callStack: Callback[]) {
	return {
		type: "SET_TRACEBACK_CALL_STACK",
		callStack,
	} as const;
}

export function clearTraceback() {
	return {
		type: "CLEAR_TRACEBACK",
	} as const;
}

export type TracebackActions = ReturnType<typeof setTracebackCallStack> | ReturnType<typeof clearTraceback>;

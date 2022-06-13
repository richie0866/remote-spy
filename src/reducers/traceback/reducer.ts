import { TracebackActions } from "./actions";
import { TracebackState } from "./model";

const initialState: TracebackState = {
	callStack: [],
};

export default function tracebackReducer(state = initialState, action: TracebackActions): TracebackState {
	switch (action.type) {
		case "SET_TRACEBACK_CALL_STACK":
			return {
				...state,
				callStack: action.callStack,
			};
		case "CLEAR_TRACEBACK":
			return {
				...state,
				callStack: [],
			};
		default:
			return state;
	}
}

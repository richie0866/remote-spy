import { RemoteLogActions } from "./actions";
import { RemoteLogState } from "./model";

const initialState: RemoteLogState = {
	logs: [],
};

export default function remoteLogReducer(state = initialState, action: RemoteLogActions): RemoteLogState {
	switch (action.type) {
		case "PUSH_REMOTE_LOG":
			return {
				logs: [...state.logs, action.log],
			};
		case "REMOVE_REMOTE_LOG":
			return {
				logs: state.logs.filter((log) => log.id !== action.id),
			};
		case "PUSH_OUTGOING_SIGNAL":
			return {
				logs: state.logs.map((log) => {
					if (log.id === action.id) {
						const outgoing = [action.signal, ...log.outgoing];
						if (outgoing.size() > 256) {
							outgoing.pop();
						}
						return {
							...log,
							outgoing,
						};
					}
					return log;
				}),
			};
		case "REMOVE_OUTGOING_SIGNAL":
			return {
				logs: state.logs.map((log) => {
					if (log.id === action.id) {
						return {
							...log,
							outgoing: log.outgoing.filter((signal) => signal.id !== action.signalId),
						};
					}
					return log;
				}),
			};
		case "CLEAR_OUTGOING_SIGNALS":
			return {
				logs: state.logs.map((log) => {
					if (log.id === action.id) {
						return {
							...log,
							outgoing: [],
						};
					}
					return log;
				}),
			};
		default:
			return state;
	}
}

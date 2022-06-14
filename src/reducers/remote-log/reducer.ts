import { RemoteLogActions } from "./actions";
import { RemoteLogState } from "./model";

const initialState: RemoteLogState = {
	logs: [],
};

export default function remoteLogReducer(state = initialState, action: RemoteLogActions): RemoteLogState {
	switch (action.type) {
		case "PUSH_REMOTE_LOG": {
			const logs = table.clone(state.logs);
			logs.push(action.log);
			logs.sort((a, b) => a.object.Name < b.object.Name);
			return { logs };
		}
		case "REMOVE_REMOTE_LOG":
			return {
				logs: state.logs.filter((log) => log.id !== action.id),
			};
		case "PUSH_OUTGOING_SIGNAL":
			return {
				logs: state.logs.map((log) => {
					if (log.id === action.id) {
						return {
							...log,
							outgoing: [...log.outgoing, action.signal],
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
		default:
			return state;
	}
}

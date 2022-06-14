import Rodux from "@rbxts/rodux";
import actionBarReducer, { ActionBarState } from "./action-bar";
import remoteLogReducer, { RemoteLogState } from "./remote-log";
import tabGroupReducer, { TabGroupState } from "./tab-group";
import tracebackReducer, { TracebackState } from "./traceback";

export interface RootState {
	actionBar: ActionBarState;
	remoteLog: RemoteLogState;
	tabGroup: TabGroupState;
	traceback: TracebackState;
}

export default Rodux.combineReducers<RootState, Rodux.AnyAction>({
	actionBar: actionBarReducer,
	remoteLog: remoteLogReducer,
	tabGroup: tabGroupReducer,
	traceback: tracebackReducer,
});

import Rodux from "@rbxts/rodux";
import actionBarReducer, { ActionBarState } from "./action-bar";
import tabGroupReducer, { TabGroupState } from "./tab-group";
import tracebackReducer, { TracebackState } from "./traceback";

export interface RootState {
	actionBar: ActionBarState;
	traceback: TracebackState;
	tabGroup: TabGroupState;
}

export default Rodux.combineReducers<RootState, Rodux.AnyAction>({
	actionBar: actionBarReducer,
	traceback: tracebackReducer,
	tabGroup: tabGroupReducer,
});

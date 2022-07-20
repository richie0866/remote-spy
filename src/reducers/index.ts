import Rodux from "@rbxts/rodux";
import ribbonReducer from "./ribbonReducer";

const rootReducer = Rodux.combineReducers({
	ribbon: ribbonReducer,
});

export default rootReducer;

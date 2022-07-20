import Rodux from "@rbxts/rodux";
import rootReducer from "reducers";

export type RootStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = Rodux.Action | Rodux.ThunkAction<unknown, RootState, unknown, Rodux.Action>;

export default function configureStore() {
	const store = new Rodux.Store(rootReducer, undefined, [Rodux.thunkMiddleware]);

	return store;
}

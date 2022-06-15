import Rodux from "@rbxts/rodux";
import rootReducer, { RootState } from "reducers";

let store: Rodux.Store<RootState, Rodux.Action>;
let isDestructed = false;

function createStore() {
	return new Rodux.Store(rootReducer, undefined);
}

export function configureStore() {
	if (store) return store;
	return (store = createStore());
}

export function destruct() {
	if (isDestructed) return;
	isDestructed = true;
	store.destruct();
}

export function isActive() {
	return store && !isDestructed;
}

export function dispatch(action: Rodux.AnyAction) {
	if (isDestructed) return;
	return configureStore().dispatch(action);
}

export function get<T>(selector: (state: RootState) => T): T;
export function get(): RootState;
export function get(selector?: (state: RootState) => unknown): unknown {
	if (isDestructed) return;
	const store = configureStore();
	return selector ? selector(store.getState()) : store.getState();
}

export function changed<T>(selector: (state: RootState) => T, callback: (state: T) => void) {
	if (isDestructed) return;
	const store = configureStore();

	let lastState = selector(store.getState());
	task.defer(callback, lastState);

	return store.changed.connect((state) => {
		const newState = selector(state);

		if (lastState !== newState) {
			task.spawn(callback, (lastState = newState));
		}
	});
}

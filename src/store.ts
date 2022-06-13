import Rodux from "@rbxts/rodux";
import rootReducer, { RootState } from "reducers";

let store: Rodux.Store<RootState, Rodux.Action>;

function createStore() {
	return new Rodux.Store(rootReducer, undefined);
}

export function configureStore() {
	if (store) {
		return store;
	}
	return (store = createStore());
}

namespace Store {
	export function dispatch(action: Rodux.AnyAction) {
		return configureStore().dispatch(action);
	}

	export function get<T>(selector: (state: RootState) => T): T;
	export function get(): RootState;
	export function get(selector?: (state: RootState) => unknown): unknown {
		const store = configureStore();
		return selector ? selector(store.getState()) : store.getState();
	}

	export function changed<T>(selector: (state: RootState) => T, callback: (state: T) => void) {
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
}

export default Store;

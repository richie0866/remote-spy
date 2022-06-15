import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import App from "components/App";
import { IS_LOADED } from "constants/env";
import { changed, configureStore } from "store";
import { getGlobal, setGlobal } from "utils/global-util";
import { selectActionIsActive } from "reducers/action-bar";

if (getGlobal(IS_LOADED) === true) {
	throw `The global ${IS_LOADED} is already defined.`;
}

const store = configureStore();

const tree = Roact.mount(
	<Provider store={store}>
		<App />
	</Provider>,
);

changed(
	(state) => selectActionIsActive(state, "close"),
	(active) => {
		if (active) {
			Roact.unmount(tree);
			store.destruct();
			setGlobal(IS_LOADED, false);
		}
	},
);

setGlobal(IS_LOADED, true);

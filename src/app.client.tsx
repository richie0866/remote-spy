import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";

import App from "components/App";
import { IS_LOADED } from "constants";
import { changed, configureStore } from "store";
import { getGlobal, setGlobal } from "utils/global-util";
import { selectIsClosing } from "reducers/action-bar";

if (getGlobal(IS_LOADED) === true) {
	throw `The global ${IS_LOADED} is already defined.`;
}

const store = configureStore();

const tree = Roact.mount(
	<StoreProvider store={store}>
		<App />
	</StoreProvider>,
);

changed(selectIsClosing, (active) => {
	if (active) {
		Roact.unmount(tree);
		setGlobal(IS_LOADED, false);
		task.defer(() => store.destruct());
	}
});

setGlobal(IS_LOADED, true);

import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import App from "components/App";
import configureStore from "configureStore";

export = (target: Frame) => {
	const tree = Roact.mount(
		<StoreProvider store={configureStore()}>
			<App />
		</StoreProvider>,
		target,
		"App",
	);

	return () => Roact.unmount(tree);
};

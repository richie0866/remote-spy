import MainWindow from "./MainWindow";
import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<StoreProvider store={configureStore()}>
			<MainWindow />
		</StoreProvider>,
		target,
		"MainWindow",
	);

	return () => {
		Roact.unmount(handle);
	};
};

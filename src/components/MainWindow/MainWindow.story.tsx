import MainWindow from "./MainWindow";
import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<MainWindow />
		</Provider>,
		target,
		"MainWindow",
	);

	return () => {
		Roact.unmount(handle);
	};
};

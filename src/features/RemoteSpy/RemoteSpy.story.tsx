import RemoteSpy from "./RemoteSpy";
import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<RemoteSpy />
		</Provider>,
		target,
		"RemoteSpy",
	);

	return () => {
		Roact.unmount(handle);
	};
};

import Roact from "@rbxts/roact";
import App from "components/App";
import RoduxProvider from "providers/RoduxProvider";

export = (target: Frame) => {
	const tree = Roact.mount(
		<RoduxProvider>
			<App />
		</RoduxProvider>,
		target,
		"App",
	);

	return () => Roact.unmount(tree);
};

import Roact from "@rbxts/roact";
import App from "components/App";

export = (target: Frame) => {
	const tree = Roact.mount(<App />, target, "App");

	return () => Roact.unmount(tree);
};

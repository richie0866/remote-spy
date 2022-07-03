import Roact from "@rbxts/roact";
import Window from "components/Window";

export = (target: Frame) => {
	const tree = Roact.mount(
		<Window initialSize={new UDim2(0, 1080, 0, 700)} initialPosition={new UDim2(0.5, -1080 / 2, 0.5, -700 / 2)}>
			<Window.DropShadow />
			<Window.Paint />
			<Window.TitleBar caption='<font color="#E5E5E5">New window</font>' icon="rbxassetid://9886981409" />
			<Window.Resizable minSize={new Vector2(350, 250)} />
		</Window>,
		target,
		"Window",
	);

	return () => Roact.unmount(tree);
};
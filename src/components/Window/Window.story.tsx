import Roact from "@rbxts/roact";
import Root from "components/Root";
import Window from ".";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Root>
			<Window.Root
				initialSize={new UDim2(0, 1080, 0, 700)}
				initialPosition={new UDim2(0.5, -1080 / 2, 0.5, -700 / 2)}
			>
				<Window.DropShadow />
				<Window.Background />
				<Window.TitleBar caption='<font color="#E5E5E5">New window</font>' icon="rbxassetid://9886981409" />
				<Window.Resize minSize={new Vector2(350, 250)} />
			</Window.Root>
		</Root>,
		target,
		"App",
	);

	return () => {
		Roact.unmount(handle);
	};
};

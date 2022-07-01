import Acrylic from "components/Acrylic";
import ActionBar from "components/ActionBar";
import Pages from "components/Pages";
import Roact from "@rbxts/roact";
import Root from "components/Root";
import SidePanel from "components/SidePanel";
import Tabs from "components/Tabs";
import Window from "components/Window";
import { activateAction } from "reducers/action-bar";
import { useRootDispatch } from "hooks/use-root-store";
import { withHooksPure } from "@rbxts/roact-hooked";

function MainWindow() {
	const dispatch = useRootDispatch();

	return (
		<Root>
			<Window.Root initialSize={new UDim2(0, 1080, 0, 700)} initialPosition={new UDim2(0.5, -540, 0.5, -350)}>
				<Window.DropShadow />
				<Acrylic.Paint />

				<ActionBar />
				<SidePanel />

				<Tabs />
				<Pages />

				<Window.TitleBar
					onClose={() => dispatch(activateAction("close"))}
					caption={`<font color="#FFFFFF">RemoteSpy</font>    <font color="#B2B2B2">${PKG_VERSION}</font>`}
					captionTransparency={0.1}
					icon="rbxassetid://9886981409"
				/>
				<Window.Resize minSize={new Vector2(650, 450)} />
			</Window.Root>
		</Root>
	);
}

export default withHooksPure(MainWindow);

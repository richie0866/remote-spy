import ActionBar from "components/ActionBar";
import FunctionTree from "components/FunctionTree";
import MainWindowBackground from "./MainWindowBackground";
import PageGroup from "components/PageGroup";
import Roact from "@rbxts/roact";
import Root from "components/Root";
import SidePanel from "components/SidePanel";
import TabGroup from "components/TabGroup";
import Traceback from "components/Traceback";
import Window from "components/Window";
import { GITHUB } from "constants";
import { activateAction } from "reducers/action-bar";
import { pure } from "@rbxts/roact-hooked";
import { useRootDispatch } from "hooks/use-root-store";

function MainWindow() {
	const dispatch = useRootDispatch();

	return (
		<Root>
			<Window.Root initialSize={new UDim2(0, 1080, 0, 700)} initialPosition={new UDim2(0.5, -540, 0.5, -350)}>
				<Window.DropShadow />
				<MainWindowBackground />

				<ActionBar />
				<TabGroup />
				<PageGroup />

				<SidePanel.Root>
					<Traceback />
					<FunctionTree />
				</SidePanel.Root>

				<Window.TitleBar
					onClose={() => dispatch(activateAction("close"))}
					caption={`<font color="#FFFFFF">RemoteSpy</font>    <font color="#B2B2B2">${GITHUB.LatestTag}</font>`}
					captionTransparency={0.1}
					icon="rbxassetid://9886981409"
				/>
				<Window.Resize minSize={new Vector2(650, 450)} />
			</Window.Root>
		</Root>
	);
}

export default pure(MainWindow);

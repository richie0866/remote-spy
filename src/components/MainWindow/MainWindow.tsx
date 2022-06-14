import ActionBar from "components/ActionBar";
import FunctionTree from "components/FunctionTree";
import PageGroup from "components/PageGroup";
import Roact from "@rbxts/roact";
import Root from "components/Root";
import SidePanel from "components/SidePanel";
import TabGroup from "components/TabGroup";
import Traceback from "components/Traceback";
import Window from "components/Window";

export default function MainWindow() {
	return (
		<Root>
			<Window.Root initialSize={new UDim2(0, 1080, 0, 700)} initialPosition={new UDim2(0.5, -540, 0.5, -350)}>
				<Window.DropShadow />
				<Window.Background background={Color3.fromHex("#202020")} transparency={0}>
					<uigradient Transparency={new NumberSequence(0.03, 0.1)} Rotation={90} />
				</Window.Background>

				<ActionBar />
				<SidePanel.Root>
					<Traceback />
					<FunctionTree />
				</SidePanel.Root>
				<TabGroup />
				<PageGroup />

				<Window.TitleBar
					caption='<font color="#FFFFFF">RemoteSpy</font>    <font color="#B2B2B2">ScriptWare</font>'
					captionTransparency={0.1}
					icon="rbxassetid://9886981409"
				/>
				<Window.Resize minSize={new Vector2(650, 450)} />
			</Window.Root>
		</Root>
	);
}

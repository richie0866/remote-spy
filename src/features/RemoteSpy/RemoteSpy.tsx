import ActionBar from "widgets/ActionBar";
import FunctionTree from "widgets/FunctionTree";
import Roact from "@rbxts/roact";
import Root from "components/Root";
import SidePanel from "widgets/SidePanel";
import TabGroup from "widgets/TabGroup";
import TabView from "widgets/TabView";
import Traceback from "widgets/Traceback";
import Window from "components/Window";

export default function RemoteSpy() {
	return (
		<Root>
			<Window.Root
				initialSize={new UDim2(0, 1080, 0, 700)}
				initialPosition={new UDim2(0.5, -1080 / 2, 0.5, -700 / 2)}
			>
				<Window.DropShadow />
				<Window.Background background={Color3.fromHex("#202020")} transparency={0}>
					<uigradient Transparency={new NumberSequence(0.03, 0.1)} Rotation={90} />
				</Window.Background>

				<ActionBar />
				<TabGroup />
				<TabView />
				<SidePanel.Root>
					<Traceback />
					<FunctionTree />
				</SidePanel.Root>

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

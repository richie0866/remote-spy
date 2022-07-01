import Roact from "@rbxts/roact";
import Screen from "components/Screen";
import Window from "components/Window";

export default function App() {
	return (
		<Screen>
			<Window initialSize={new UDim2(0, 1080, 0, 700)} initialPosition={new UDim2(0.5, -540, 0.5, -350)}>
				<Window.DropShadow />
				<Window.Paint />
				<Window.TitleBar
					icon="rbxassetid://9886981409"
					caption={`<font color="#FFFFFF">RemoteSpy</font>    <font color="#B2B2B2">${PKG_VERSION}</font>`}
				/>
				<Window.Resizable minSize={new Vector2(650, 450)} />
			</Window>
		</Screen>
	);
}

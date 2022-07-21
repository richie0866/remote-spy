import Roact from "@rbxts/roact";
import Outline from "components/Outline";
import Ribbon from "components/Ribbon";
import Screen from "components/Screen";
import Traffic from "components/Traffic";
import Window from "components/Window";

export default function App() {
	return (
		<Screen>
			<Window initialSize={new UDim2(0, 900, 0, 600)} initialPosition={new UDim2(0.5, -450, 0.5, -300)}>
				<Window.DropShadow />
				<Window.Paint />
				<Ribbon />
				<Outline />
				<Traffic />
				<Window.TitleBar
					icon="rbxassetid://9886981409"
					caption={`RemoteSpy    <font color="#B2B2B2">${PKG_VERSION}</font>`}
				/>
				<Window.Resizable minSize={new Vector2(650, 450)} />
			</Window>
		</Screen>
	);
}

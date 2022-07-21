import Roact from "@rbxts/roact";
import Container from "components/Container";
import OutlineBackground from "./OutlineBackground";
import OutlineHeader from "./OutlineHeader";

export default function Outline() {
	return (
		<Container size={new UDim2(0, 268, 1, -96)} position={new UDim2(0, 6, 0, 90)}>
			<OutlineBackground />
			<OutlineHeader />
		</Container>
	);
}

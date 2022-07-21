import Roact from "@rbxts/roact";
import Container from "components/Container";
import TrafficBackground from "./TrafficBackground";

export default function Traffic() {
	return (
		<Container size={new UDim2(1, -286, 1, -131)} position={new UDim2(0, 280, 0, 125)}>
			<TrafficBackground />
		</Container>
	);
}

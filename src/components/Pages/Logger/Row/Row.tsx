import Container from "components/Container";
import Roact from "@rbxts/roact";
import RowView from "./RowView";
import { OutgoingSignal } from "reducers/remote-log";
import { Spring } from "@rbxts/flipper";
import { useBinding, useEffect, withHooksPure } from "@rbxts/roact-hooked";
import { useSingleMotor } from "@rbxts/roact-hooked-plus";

interface Props {
	signal: OutgoingSignal;
	order: number;
	selected: boolean;
}

function Row({ signal, order, selected }: Props) {
	const [contentHeight, setContentHeight] = useBinding(0);
	const [animation, setGoal] = useSingleMotor(0);

	useEffect(() => {
		setGoal(new Spring(selected ? 1 : 0, { frequency: 6 }));
	}, [selected]);

	return (
		<Container
			order={order}
			size={Roact.joinBindings([contentHeight, animation]).map(
				([y, a]) => new UDim2(1, 0, 0, 64 + math.round(y * a)),
			)}
			clipChildren
		>
			<RowView signal={signal} onHeightChange={setContentHeight} selected={selected} />
		</Container>
	);
}

export default withHooksPure(Row);

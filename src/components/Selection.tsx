import Container from "./Container";
import Roact from "@rbxts/roact";
import { Instant, Linear, Spring } from "@rbxts/flipper";
import { useBinding, useEffect, withHooksPure } from "@rbxts/roact-hooked";
import { useSingleMotor, useSpring } from "@rbxts/roact-hooked-plus";

interface Props {
	height: number;
	offset?: number;
	hasSelection: boolean;
}

function Selection({ height, offset, hasSelection }: Props) {
	const [offsetAnim, setOffsetGoal, offsetSpring] = useSingleMotor(-100);
	const [speedAnim, setSpeedGoal] = useSingleMotor(0);
	const heightAnim = useSpring(hasSelection ? 20 : 0, { frequency: 8 });

	useEffect(() => {
		if (offset !== undefined) {
			setOffsetGoal(new Spring(offset, { frequency: 5 }));
		}
	}, [offset]);

	useEffect(() => {
		if (hasSelection && offset !== undefined) {
			setOffsetGoal(new Instant(offset));
		}
	}, [hasSelection]);

	useEffect(() => {
		if (!hasSelection) {
			setSpeedGoal(new Instant(0));
			return;
		}

		let lastValue = offset;
		let lastTime = 0;

		const handle = offsetSpring.onStep((value) => {
			const now = tick();
			const deltaTime = now - lastTime;

			if (lastValue !== undefined) {
				setSpeedGoal(new Linear(math.abs(value - lastValue) / (deltaTime * 60), { velocity: 300 }));
				lastValue = value;
			}

			lastTime = now;
		});

		return () => handle.disconnect();
	}, [hasSelection]);

	return (
		<Container
			size={new UDim2(0, 4, 0, height)}
			position={offsetAnim.map((y) => new UDim2(0, 0, 0, math.round(y)))}
		>
			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				Size={Roact.joinBindings([heightAnim, speedAnim]).map(
					([h, s]) => new UDim2(0, 4, 0, math.round(h + s * 1.7)),
				)}
				Position={new UDim2(0, 0, 0.5, 0)}
				BackgroundColor3={Color3.fromHex("#4CC2FF")}
			>
				<uicorner CornerRadius={new UDim(0, 2)} />
			</frame>
		</Container>
	);
}

export default withHooksPure(Selection);

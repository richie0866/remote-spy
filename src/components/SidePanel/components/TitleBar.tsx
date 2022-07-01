import Button from "components/Button";
import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { useGroupMotor } from "@rbxts/roact-hooked-plus";
import { withHooksPure } from "@rbxts/roact-hooked";

interface Props {
	caption: string;
	hidden: boolean;
	toggleHidden: () => void;
}

const CHEVRON_DEFAULT = [new Spring(1, { frequency: 6 }), new Spring(0, { frequency: 6 })];
const CHEVRON_HOVERED = [new Spring(0.95, { frequency: 6 }), new Spring(0, { frequency: 6 })];
const CHEVRON_PRESSED = [new Instant(0.97), new Instant(0.2)];

function TitleBar({ caption, hidden, toggleHidden }: Props) {
	const [chevronTransparency, setChevronGoal] = useGroupMotor([1, 0]);
	const chevronBackgroundTransparency = chevronTransparency.map((t) => t[0]);
	const chevronForegroundTransparency = chevronTransparency.map((t) => t[1]);

	return (
		<>
			{/* Caption */}
			<textlabel
				Text={caption}
				TextColor3={new Color3(1, 1, 1)}
				Font="GothamBold"
				TextSize={11}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Size={new UDim2(1, -24, 0, 20)}
				Position={new UDim2(0, 12, 0, 14)}
				BackgroundTransparency={1}
			/>

			{/* Chevron */}
			<Button
				onClick={() => {
					setChevronGoal(CHEVRON_HOVERED);
					toggleHidden();
				}}
				onPress={() => setChevronGoal(CHEVRON_PRESSED)}
				onHover={() => setChevronGoal(CHEVRON_HOVERED)}
				onHoverEnd={() => setChevronGoal(CHEVRON_DEFAULT)}
				transparency={chevronBackgroundTransparency}
				size={new UDim2(0, 24, 0, 24)}
				position={new UDim2(1, -8, 0, 8)}
				anchorPoint={new Vector2(1, 0)}
				cornerRadius={new UDim(0, 4)}
			>
				<imagelabel
					Image={hidden ? "rbxassetid://9888526164" : "rbxassetid://9888526348"}
					ImageTransparency={chevronForegroundTransparency}
					Size={new UDim2(0, 16, 0, 16)}
					Position={new UDim2(0, 4, 0, 4)}
					BackgroundTransparency={1}
				/>
			</Button>
		</>
	);
}

export default withHooksPure(TitleBar);

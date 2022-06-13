import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useGroupMotor } from "@rbxts/roact-hooked-plus";

interface Props {
	caption: string;
	hidden: boolean;
	toggleHidden: () => void;
}

function TitleBar({ caption, hidden, toggleHidden }: Props) {
	const [transparency, setGoal] = useGroupMotor([1, 0]);

	const backgroundTransparency = transparency.map((t) => t[0]);
	const foregroundTransparency = transparency.map((t) => t[1]);

	return (
		<>
			<textbutton
				Event={{
					Activated: () => {
						setGoal([new Spring(0.92, { frequency: 6 }), new Spring(0, { frequency: 6 })]);
						toggleHidden();
					},
					MouseButton1Down: () => setGoal([new Instant(0.96), new Instant(0.2)]),
					MouseEnter: () => setGoal([new Spring(0.92, { frequency: 6 }), new Spring(0, { frequency: 6 })]),
					MouseLeave: () => setGoal([new Spring(1, { frequency: 6 }), new Spring(0, { frequency: 6 })]),
				}}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={backgroundTransparency}
				BorderSizePixel={0}
				Size={new UDim2(1, -10, 0, 5 * 2 + 20)}
				Position={new UDim2(0, 5, 0, 5)}
				Text=""
			>
				<uicorner CornerRadius={new UDim(0, 4)} />
			</textbutton>

			<textlabel
				Text={caption}
				TextColor3={new Color3(1, 1, 1)}
				TextTransparency={foregroundTransparency}
				Font="GothamBold"
				TextSize={11}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Size={new UDim2(1, -24, 0, 20)}
				Position={new UDim2(0, 12, 0, 14)}
				BackgroundTransparency={1}
			/>

			<imagelabel
				Image={hidden ? "rbxassetid://9888526164" : "rbxassetid://9888526348"}
				ImageTransparency={foregroundTransparency}
				BackgroundTransparency={1}
				Size={new UDim2(0, 16, 0, 16)}
				Position={new UDim2(1, -12, 0, 12)}
				AnchorPoint={new Vector2(1)}
			/>
		</>
	);
}

export default pure(TitleBar);

import Button from "components/Button";
import Roact from "@rbxts/roact";
import { ActionBarStates, activateAction, selectActionById } from "reducers/action-bar";
import { Instant, Spring } from "@rbxts/flipper";
import { TextService } from "@rbxts/services";
import { pure, useMemo } from "@rbxts/roact-hooked";
import { useGroupMotor } from "@rbxts/roact-hooked-plus";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

const MARGIN = 10;
const BUTTON_DEFAULT = [new Spring(1, { frequency: 6 }), new Spring(0, { frequency: 6 })];
const BUTTON_HOVERED = [new Spring(0.94, { frequency: 6 }), new Spring(0, { frequency: 6 })];
const BUTTON_PRESSED = [new Instant(0.96), new Instant(0.2)];

interface Props {
	id: keyof ActionBarStates;
	icon?: string;
	caption?: string;
}

function ActionButton({ id, icon, caption }: Props) {
	const dispatch = useRootDispatch();
	const actionState = useRootSelector((state) => selectActionById(state, id));

	const [transparency, setGoal] = useGroupMotor([1, 0]);
	const backgroundTransparency = actionState.disabled ? 1 : transparency.map((t) => t[0]);
	const foregroundTransparency = actionState.disabled ? 0.5 : transparency.map((t) => t[1]);

	const textSize = useMemo(() => {
		return caption !== undefined
			? TextService.GetTextSize(caption, 11, "Gotham", new Vector2(150, 36))
			: new Vector2();
	}, [caption]);

	return (
		<Button
			onClick={() => {
				setGoal(BUTTON_HOVERED);
				!actionState.disabled && !actionState.active && dispatch(activateAction(id));
			}}
			onPress={() => setGoal(BUTTON_PRESSED)}
			onHover={() => setGoal(BUTTON_HOVERED)}
			onLeave={() => setGoal(BUTTON_DEFAULT)}
			active={!actionState.disabled}
			size={new UDim2(0, caption !== undefined ? textSize.X + 16 + MARGIN * 3 : 36, 0, 36)}
			transparency={backgroundTransparency}
			cornerRadius={new UDim(0, 4)}
		>
			{/* Icon */}
			<imagelabel
				Image={icon}
				ImageTransparency={foregroundTransparency}
				Size={new UDim2(0, 16, 0, 16)}
				Position={new UDim2(0, MARGIN, 0.5, 0)}
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
			/>

			{/* Caption */}
			{caption !== undefined && (
				<textlabel
					Text={caption}
					Font="Gotham"
					TextColor3={new Color3(1, 1, 1)}
					TextTransparency={foregroundTransparency}
					TextSize={11}
					TextXAlignment="Left"
					TextYAlignment="Center"
					Size={new UDim2(1, 0, 1, 0)}
					Position={new UDim2(0, MARGIN * 2 + 16, 0, 0)}
					BackgroundTransparency={1}
				/>
			)}
		</Button>
	);
}

export default pure(ActionButton);

import { Instant, Spring } from "@rbxts/flipper";
import Roact from "@rbxts/roact";
import { withHooksPure } from "@rbxts/roact-hooked";
import { useGroupMotor } from "@rbxts/roact-hooked-plus";
import { ribbonItemPressed } from "actions/ribbon";
import Button from "components/Button";
import { useRootDispatch } from "hooks/useRootStore";
import useTextSize from "hooks/useTextSize";
import { RibbonItemType } from "reducers/ribbonReducer";
import useRibbonItem from "./useRibbonItem";

interface RibbonItemProps {
	itemType: RibbonItemType;
	icon: string;
	caption?: string;
}

const PADDING = 10;

const itemDefault = [new Spring(1, { frequency: 6 }), new Spring(0, { frequency: 6 })];
const itemHovered = [new Spring(0.94, { frequency: 6 }), new Spring(0, { frequency: 6 })];
const itemPressed = [new Instant(0.96), new Instant(0.2)];

function RibbonItem({ itemType, icon, caption }: RibbonItemProps) {
	const dispatch = useRootDispatch();
	const item = useRibbonItem(itemType);
	const textSize = useTextSize(caption, 11, "Gotham", new Vector2(150, 36));

	const [binding, setGoal] = useGroupMotor([1, 0]);
	const backgroundBinding = item.status === "enabled" ? binding.map((v) => v[0]) : 1;
	const foregroundBinding = item.status === "enabled" ? binding.map((v) => v[1]) : 0.5;

	const buttonWidth = caption !== undefined ? textSize.X + 16 + PADDING * 3 : 16 + PADDING * 2;

	return (
		<Button
			onClick={() => {
				setGoal(itemHovered);
				dispatch(ribbonItemPressed(itemType));
			}}
			onPress={() => setGoal(itemPressed)}
			onMouseEnter={() => setGoal(itemHovered)}
			onMouseLeave={() => setGoal(itemDefault)}
			active={item.status === "enabled"}
			size={new UDim2(0, buttonWidth, 0, 36)}
			transparency={backgroundBinding}
			cornerRadius={new UDim(0, 4)}
		>
			<Button.Icon
				icon={icon}
				size={new UDim2(0, 16, 0, 16)}
				position={new UDim2(0, PADDING, 0.5, 0)}
				anchorPoint={new Vector2(0, 0.5)}
				transparency={foregroundBinding}
			/>

			{caption !== undefined && (
				<textlabel
					Text={caption}
					Font="Gotham"
					TextColor3={new Color3(1, 1, 1)}
					TextSize={11}
					TextTransparency={foregroundBinding}
					TextXAlignment="Left"
					Size={new UDim2(1, 0, 1, 0)}
					Position={new UDim2(0, PADDING * 2 + 16, 0, 0)}
					BackgroundTransparency={1}
				/>
			)}
		</Button>
	);
}

export default withHooksPure(RibbonItem);

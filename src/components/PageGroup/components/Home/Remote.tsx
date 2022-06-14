import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { TabType, createTabColumn, pushTab, selectTab, setActiveTab } from "reducers/tab-group";
import { multiply } from "utils/number-util";
import { pure, useCallback, useMutable } from "@rbxts/roact-hooked";
import { selectRemoteLog } from "reducers/remote-log/selectors";
import { useGroupMotor, useSpring } from "@rbxts/roact-hooked-plus";
import { useRootSelector, useRootStore } from "hooks/use-root-store";

interface Props {
	id: string;
	selected: boolean;
	onClick: () => void;
}

function Remote({ onClick, id, selected }: Props) {
	const store = useRootStore();
	const logger = useRootSelector((state) => selectRemoteLog(state, id));

	const [transparency, setGoal] = useGroupMotor([1, 0]);
	const backgroundTransparency = transparency.map((t) => t[0]);
	const foregroundTransparency = transparency.map((t) => t[1]);
	const highlightTransparency = useSpring(selected ? 0.95 : 1, { frequency: 6 });

	const lastClickTime = useMutable(0);
	const openOnDoubleClick = useCallback(() => {
		if (!logger) return;

		const now = tick();

		if (now - lastClickTime.current > 0.3) {
			lastClickTime.current = now;
			return false;
		}

		lastClickTime.current = now;

		if (selectTab(store.getState(), id) === undefined) {
			const tab = createTabColumn(id, logger.object.Name, logger.type);
			store.dispatch(pushTab(tab));
		}

		store.dispatch(setActiveTab(id));
		return true;
	}, [id]);

	if (!logger) {
		return <></>;
	}

	return (
		<textbutton
			Event={{
				Activated: () => {
					setGoal([new Spring(0.95, { frequency: 6 }), new Spring(0, { frequency: 6 })]);
					if (!openOnDoubleClick() || selected) {
						onClick();
					}
				},
				MouseButton1Down: () => setGoal([new Instant(0.97), new Instant(0.2)]),
				MouseEnter: () => setGoal([new Spring(0.95, { frequency: 6 }), new Spring(0, { frequency: 6 })]),
				MouseLeave: () => setGoal([new Spring(1, { frequency: 6 }), new Spring(0, { frequency: 6 })]),
			}}
			Size={new UDim2(1, 0, 0, 64)}
			BackgroundColor3={new Color3(1, 1, 1)}
			BackgroundTransparency={backgroundTransparency}
			Text=""
			AutoButtonColor={false}
		>
			<uicorner CornerRadius={new UDim(0, 4)} />

			{/* Selection highlight */}
			<frame
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={highlightTransparency}
			>
				<uicorner CornerRadius={new UDim(0, 4)} />
			</frame>

			{/* Icon */}
			<imagelabel
				Image={logger.type === TabType.Event ? "rbxassetid://9904941486" : "rbxassetid://9904941685"}
				ImageTransparency={foregroundTransparency}
				Size={new UDim2(0, 24, 0, 24)}
				Position={new UDim2(0, 18, 0, 20)}
				BackgroundTransparency={1}
			/>

			{/* Name */}
			<textlabel
				Text={
					logger.outgoing.size() > 0
						? `${logger.object.Name} • ${logger.outgoing.size()} outgoing`
						: logger.object.Name
				}
				Font="Gotham"
				TextColor3={new Color3(1, 1, 1)}
				TextTransparency={foregroundTransparency}
				TextSize={13}
				TextXAlignment="Left"
				TextYAlignment="Bottom"
				Size={new UDim2(1, -100, 0, 12)}
				Position={new UDim2(0, 58, 0, 18)}
				BackgroundTransparency={1}
			>
				<uigradient
					Transparency={
						new NumberSequence([
							new NumberSequenceKeypoint(0, 0),
							new NumberSequenceKeypoint(0.9, 0),
							new NumberSequenceKeypoint(1, 1),
						])
					}
				/>
			</textlabel>

			{/* Path */}
			<textlabel
				Text={logger.object.GetFullName()}
				Font="Gotham"
				TextColor3={new Color3(1, 1, 1)}
				TextTransparency={foregroundTransparency.map((t) => multiply(t, 0.2))}
				TextSize={11}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Size={new UDim2(1, -100, 0, 12)}
				Position={new UDim2(0, 58, 0, 39)}
				BackgroundTransparency={1}
			>
				<uigradient
					Transparency={
						new NumberSequence([
							new NumberSequenceKeypoint(0, 0),
							new NumberSequenceKeypoint(0.9, 0),
							new NumberSequenceKeypoint(1, 1),
						])
					}
				/>
			</textlabel>

			{/* Right Caret */}
			<imagelabel
				Image="rbxassetid://9905659174"
				ImageTransparency={foregroundTransparency}
				AnchorPoint={new Vector2(1, 0)}
				Size={new UDim2(0, 16, 0, 16)}
				Position={new UDim2(1, -18, 0, 24)}
				BackgroundTransparency={1}
			/>
		</textbutton>
	);
}

export default pure(Remote);

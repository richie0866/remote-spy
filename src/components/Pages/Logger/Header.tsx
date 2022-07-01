import Button from "components/Button";
import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { TabType } from "reducers/tab-group";
import { clearOutgoingSignals } from "reducers/remote-log";
import { formatEscapes } from "utils/format-escapes";
import { getInstancePath } from "utils/instance-util";
import { makeSelectRemoteLogObject, makeSelectRemoteLogType } from "reducers/remote-log";
import { useGroupMotor } from "@rbxts/roact-hooked-plus";
import { useMemo, withHooksPure } from "@rbxts/roact-hooked";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

interface Props {
	id: string;
}

const deleteSprings = {
	default: [new Spring(0.94, { frequency: 6 }), new Spring(0, { frequency: 6 })],
	hovered: [new Spring(0.9, { frequency: 6 }), new Spring(0, { frequency: 6 })],
	pressed: [new Instant(0.94), new Instant(0.2)],
};

const captionTransparency = new NumberSequence([
	new NumberSequenceKeypoint(0, 0),
	new NumberSequenceKeypoint(0.85, 0),
	new NumberSequenceKeypoint(1, 1),
]);

function Header({ id }: Props) {
	const dispatch = useRootDispatch();

	const selectType = useMemo(makeSelectRemoteLogType, []);
	const remoteType = useRootSelector((state) => selectType(state, id));

	const selectObject = useMemo(makeSelectRemoteLogObject, []);
	const remoteObject = useRootSelector((state) => selectObject(state, id));

	const [deleteTransparency, setDeleteTransparency] = useGroupMotor([0.94, 0]);
	const deleteButton = useMemo(
		() => ({
			background: deleteTransparency.map((t) => t[0]),
			foreground: deleteTransparency.map((t) => t[1]),
		}),
		[],
	);

	return (
		<frame
			BackgroundColor3={new Color3(1, 1, 1)}
			BackgroundTransparency={0.96}
			Size={new UDim2(1, 0, 0, 64)}
			LayoutOrder={-1}
		>
			<uicorner CornerRadius={new UDim(0, 4)} />

			{/* Delete history */}
			<Button
				onClick={() => {
					setDeleteTransparency(deleteSprings.hovered);
					dispatch(clearOutgoingSignals(id));
				}}
				onPress={() => setDeleteTransparency(deleteSprings.pressed)}
				onHover={() => setDeleteTransparency(deleteSprings.hovered)}
				onHoverEnd={() => setDeleteTransparency(deleteSprings.default)}
				anchorPoint={new Vector2(1, 0)}
				size={new UDim2(0, 94, 0, 28)}
				position={new UDim2(1, -18, 0, 18)}
				transparency={deleteButton.background}
				cornerRadius={new UDim(0, 4)}
			>
				<textlabel
					Text="Delete history"
					Font="Gotham"
					TextColor3={new Color3(1, 1, 1)}
					TextTransparency={deleteButton.foreground}
					TextSize={11}
					TextXAlignment="Center"
					TextYAlignment="Center"
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
				>
					<uigradient Transparency={captionTransparency} />
				</textlabel>
			</Button>

			{/* Icon */}
			<imagelabel
				Image={remoteType === TabType.Event ? "rbxassetid://9904941486" : "rbxassetid://9904941685"}
				Size={new UDim2(0, 24, 0, 24)}
				Position={new UDim2(0, 18, 0, 20)}
				BackgroundTransparency={1}
			/>

			{/* Name */}
			<textlabel
				Text={remoteObject ? formatEscapes(remoteObject.Name) : "Unknown"}
				Font="Gotham"
				TextColor3={new Color3(1, 1, 1)}
				TextSize={13}
				TextXAlignment="Left"
				TextYAlignment="Bottom"
				Size={new UDim2(1, -170, 0, 12)}
				Position={new UDim2(0, 58, 0, 18)}
				BackgroundTransparency={1}
			>
				<uigradient Transparency={captionTransparency} />
			</textlabel>

			{/* Path */}
			<textlabel
				Text={remoteObject ? formatEscapes(getInstancePath(remoteObject)) : "Unknown"}
				Font="Gotham"
				TextColor3={new Color3(1, 1, 1)}
				TextTransparency={0.2}
				TextSize={11}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Size={new UDim2(1, -170, 0, 12)}
				Position={new UDim2(0, 58, 0, 39)}
				BackgroundTransparency={1}
			>
				<uigradient Transparency={captionTransparency} />
			</textlabel>
		</frame>
	);
}

export default withHooksPure(Header);

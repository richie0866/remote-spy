import Button from "components/Button";
import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { OutgoingSignal } from "reducers/remote-log";
import { formatEscapes } from "utils/format-escapes";
import { getInstancePath } from "utils/instance-util";
import { multiply } from "utils/number-util";
import { stringifyFunctionSignature } from "utils/function-util";
import { useGroupMotor } from "@rbxts/roact-hooked-plus";
import { withHooksPure } from "@rbxts/roact-hooked";

interface Props {
	signal: OutgoingSignal;
	open: boolean;
	onClick: () => void;
}

const rowSprings = {
	default: [new Spring(0.97, { frequency: 6 }), new Spring(0, { frequency: 6 })],
	defaultOpen: [new Spring(0.96, { frequency: 6 }), new Spring(0, { frequency: 6 })],
	hovered: [new Spring(0.93, { frequency: 6 }), new Spring(0, { frequency: 6 })],
	pressed: [new Instant(0.98), new Instant(0.2)],
};

const captionTransparency = new NumberSequence([
	new NumberSequenceKeypoint(0, 0),
	new NumberSequenceKeypoint(0.9, 0),
	new NumberSequenceKeypoint(1, 1),
]);

function RowHeader({ signal, open, onClick }: Props) {
	const [rowTransparency, setRowTransparency] = useGroupMotor([0.97, 0]);
	const rowButton = {
		background: rowTransparency.map((t) => t[0]),
		foreground: rowTransparency.map((t) => t[1]),
	};

	return (
		<Button
			onClick={() => {
				setRowTransparency(rowSprings.hovered);
				onClick();
			}}
			onPress={() => setRowTransparency(rowSprings.pressed)}
			onHover={() => setRowTransparency(rowSprings.hovered)}
			onHoverEnd={() => setRowTransparency(open ? rowSprings.defaultOpen : rowSprings.default)}
			size={new UDim2(1, 0, 0, 64)}
		>
			{/* Background */}
			<imagelabel
				Image={open ? "rbxassetid://9913260292" : "rbxassetid://9913260388"}
				ImageColor3={new Color3(1, 1, 1)}
				ImageTransparency={rowButton.background}
				ScaleType="Slice"
				SliceCenter={new Rect(4, 4, 4, 4)}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
			/>

			{/* Icon */}
			<imagelabel
				Image={"rbxassetid://9913356706"}
				ImageTransparency={rowButton.foreground}
				Size={new UDim2(0, 24, 0, 24)}
				Position={new UDim2(0, 18, 0, 20)}
				BackgroundTransparency={1}
			/>

			{/* Source name and line number */}
			<textlabel
				Text={`${
					signal.caller ? formatEscapes(signal.caller.Name) : "No script"
				} • ${stringifyFunctionSignature(signal.callback)}`}
				Font="Gotham"
				TextColor3={new Color3(1, 1, 1)}
				TextTransparency={rowButton.foreground}
				TextSize={13}
				TextXAlignment="Left"
				TextYAlignment="Bottom"
				Size={new UDim2(1, -100, 0, 12)}
				Position={new UDim2(0, 58, 0, 18)}
				BackgroundTransparency={1}
			>
				<uigradient Transparency={captionTransparency} />
			</textlabel>

			{/* Source path */}
			<textlabel
				Text={signal.caller ? formatEscapes(getInstancePath(signal.caller)) : "Not called from a script"}
				Font="Gotham"
				TextColor3={new Color3(1, 1, 1)}
				TextTransparency={rowButton.foreground.map((t) => multiply(t, 0.2))}
				TextSize={11}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Size={new UDim2(1, -100, 0, 12)}
				Position={new UDim2(0, 58, 0, 39)}
				BackgroundTransparency={1}
			>
				<uigradient Transparency={captionTransparency} />
			</textlabel>

			{/* Up/down chevron */}
			<imagelabel
				Image={open ? "rbxassetid://9913448536" : "rbxassetid://9913448364"}
				ImageTransparency={rowButton.foreground}
				AnchorPoint={new Vector2(1, 0)}
				Size={new UDim2(0, 16, 0, 16)}
				Position={new UDim2(1, -18, 0, 24)}
				BackgroundTransparency={1}
			/>
		</Button>
	);
}

export default withHooksPure(RowHeader);

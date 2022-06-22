import Roact from "@rbxts/roact";
import { DISPLAY_ORDER } from "constants";
import { Players } from "@rbxts/services";

interface Props extends Roact.PropsWithChildren {
	displayOrder?: number;
}

function hasCoreAccess() {
	return opcall(() => game.GetService("CoreGui").Name).success;
}

function getTarget() {
	if (gethui) {
		return gethui(); // Executor
	}
	if (hasCoreAccess()) {
		return game.GetService("CoreGui"); // Plugin, Command line
	}
	return Players.LocalPlayer.WaitForChild("PlayerGui"); // LocalScript
}

export default function Root({ displayOrder = 0, [Roact.Children]: children }: Props) {
	return (
		<Roact.Portal target={getTarget()}>
			<screengui
				IgnoreGuiInset
				ResetOnSpawn={false}
				ZIndexBehavior="Sibling"
				DisplayOrder={DISPLAY_ORDER + displayOrder}
			>
				{children}
			</screengui>
		</Roact.Portal>
	);
}

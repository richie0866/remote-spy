import Roact from "@rbxts/roact";
import getTarget from "./getTarget";

interface ScreenProps extends Roact.PropsWithChildren {
	displayOrder?: number;
}

export const MIN_DISPLAY_ORDER = 6;

export default function Screen({ displayOrder = 0, [Roact.Children]: children }: ScreenProps) {
	return (
		<Roact.Portal target={getTarget()}>
			<screengui
				IgnoreGuiInset
				ResetOnSpawn={false}
				ZIndexBehavior="Sibling"
				DisplayOrder={MIN_DISPLAY_ORDER + displayOrder}
			>
				{children}
			</screengui>
		</Roact.Portal>
	);
}

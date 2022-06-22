import { Workspace } from "@rbxts/services";
import { map } from "utils/number-util";

export function viewportPointToWorld(location: Vector2, distance: number): Vector3 {
	const unitRay = Workspace.CurrentCamera!.ScreenPointToRay(location.X, location.Y);
	return unitRay.Origin.add(unitRay.Direction.mul(distance));
}

export function getOffset() {
	return map(Workspace.CurrentCamera!.ViewportSize.Y, 0, 2560, 8, 56);
}

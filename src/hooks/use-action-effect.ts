import { ActionBarStates, deactivateAction, selectActionIsActive } from "reducers/action-bar";
import { useEffect } from "@rbxts/roact-hooked";
import { useRootDispatch, useRootSelector } from "./use-root-store";

export function useActionEffect(action: keyof ActionBarStates, effect: () => void) {
	const dispatch = useRootDispatch();
	const activated = useRootSelector((state) => selectActionIsActive(state, action));

	useEffect(() => {
		if (activated) {
			task.spawn(effect);
			dispatch(deactivateAction(action));
		}
	}, [activated]);
}

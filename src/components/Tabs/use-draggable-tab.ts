import Roact from "@rbxts/roact";
import { RunService, UserInputService } from "@rbxts/services";
import { getTabWidth, moveTab, selectTabs } from "reducers/tab-group";
import { useBinding, useEffect, useState } from "@rbxts/roact-hooked";
import { useRootDispatch, useRootStore } from "hooks/use-root-store";

interface DragState {
	dragging: boolean;
	mousePosition: number;
	tabPosition: number;
}

export function useDraggableTab(id: string, width: number, canvasPosition: Roact.Binding<Vector2>) {
	const store = useRootStore();
	const dispatch = useRootDispatch();

	const [dragState, setDragState] = useState<DragState>();
	const [dragPosition, setDragPosition] = useBinding<number | undefined>(undefined);

	useEffect(() => {
		if (!dragState) return;

		const estimateNewIndex = (dragOffset: number) => {
			let totalWidth = 0;

			for (const t of tabs) {
				totalWidth += getTabWidth(t);

				if (totalWidth > dragOffset + width / 2) {
					return tabs.indexOf(t);
				}
			}

			return tabs.size() - 1;
		};

		const tabs = selectTabs(store.getState());
		const startCanvasPosition = canvasPosition.getValue();

		let lastIndex = estimateNewIndex(0);

		const mouseMoved = RunService.Heartbeat.Connect(() => {
			const current = UserInputService.GetMouseLocation();
			const position = current.X - dragState.mousePosition + dragState.tabPosition;
			const canvasDelta = canvasPosition.getValue().X - startCanvasPosition.X;

			setDragPosition(position + canvasDelta);

			const newIndex = estimateNewIndex(position + canvasDelta);
			if (newIndex !== lastIndex) {
				lastIndex = newIndex;
				dispatch(moveTab(id, newIndex));
			}
		});

		const mouseUp = UserInputService.InputEnded.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				setDragState(undefined);
				setDragPosition(undefined);
			}
		});

		return () => {
			mouseMoved.Disconnect();
			mouseUp.Disconnect();
		};
	}, [dragState]);

	return [dragPosition, setDragState] as const;
}

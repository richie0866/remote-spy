import {
	TabGroupColumn,
	deleteTab,
	getTabWidth,
	makeSelectTabOffset,
	moveTab,
	pushTab,
	selectActiveTabId,
	selectTab,
	selectTabCount,
	selectTabGroup,
	selectTabIsActive,
	selectTabOrder,
	selectTabType,
	selectTabs,
	setActiveTab,
} from "reducers/tab-group";
import { useMemo } from "@rbxts/roact-hooked";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

export function useTabWidth(tab: TabGroupColumn) {
	return getTabWidth(tab);
}

export function useTabType(id: string) {
	return useRootSelector((state) => selectTabType(state, id));
}

export function useTabOffset(id: string) {
	const selectTabOffset = useMemo(makeSelectTabOffset, []);
	return useRootSelector((state) => selectTabOffset(state, id));
}

export function useTabGroup() {
	return useRootSelector(selectTabGroup);
}

export function useTabs() {
	return useRootSelector(selectTabs);
}

export function useTabCount() {
	return useRootSelector(selectTabCount);
}

export function useActiveTabId() {
	return useRootSelector(selectActiveTabId);
}

export function useTab(id: string) {
	return useRootSelector((state) => selectTab(state, id));
}

export function useTabIsActive(id: string) {
	return useRootSelector((state) => selectTabIsActive(state, id));
}

export function useTabOrder(id: string) {
	return useRootSelector((state) => selectTabOrder(state, id));
}

export function useSetActiveTab(id: string) {
	const dispatch = useRootDispatch();
	return () => dispatch(setActiveTab(id));
}

export function useDeleteTab(id: string) {
	const dispatch = useRootDispatch();
	return () => dispatch(deleteTab(id));
}

export function useMoveTab(id: string) {
	const dispatch = useRootDispatch();
	return (to: number) => dispatch(moveTab(id, to));
}

export function usePushTab() {
	const dispatch = useRootDispatch();
	return (tab: TabGroupColumn) => dispatch(pushTab(tab));
}

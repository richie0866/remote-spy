import { TabGroupColumn } from "./model";

export function pushTab(tab: TabGroupColumn) {
	return {
		type: "PUSH_TAB",
		tab,
	} as const;
}

export function deleteTab(id: string) {
	return {
		type: "DELETE_TAB",
		id,
	} as const;
}

export function moveTab(id: string, to: number) {
	return {
		type: "MOVE_TAB",
		id,
		to,
	} as const;
}

export function setActiveTab(id: string) {
	return {
		type: "SET_ACTIVE_TAB",
		id,
	} as const;
}

export type TabGroupActions =
	| ReturnType<typeof pushTab>
	| ReturnType<typeof deleteTab>
	| ReturnType<typeof moveTab>
	| ReturnType<typeof setActiveTab>;

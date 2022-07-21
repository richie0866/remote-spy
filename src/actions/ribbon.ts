import { RootStore } from "configureStore";
import { RibbonItemType } from "reducers/ribbonReducer";

function ribbonPrevious() {
	return (store: RootStore) => {};
}

function ribbonNext() {
	return (store: RootStore) => {};
}

export function ribbonItemPressed(itemType: RibbonItemType) {
	switch (itemType) {
		case "previous":
			return ribbonPrevious();
		case "next":
			return ribbonNext();
		default:
			return () => {};
	}
}

export function ribbonItemEnabled(itemType: RibbonItemType) {
	return {
		type: "ribbon/ITEM_ENABLED",
		itemType,
	} as const;
}

export function ribbonItemDisabled(itemType: RibbonItemType) {
	return {
		type: "ribbon/ITEM_DISABLED",
		itemType,
	} as const;
}

export type RibbonAction = ReturnType<typeof ribbonItemEnabled> | ReturnType<typeof ribbonItemDisabled>;

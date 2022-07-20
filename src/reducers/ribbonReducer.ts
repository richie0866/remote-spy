import { RibbonAction } from "actions/ribbon";

export interface RibbonState {
	items: Record<RibbonItemType, RibbonStateItem>;
}

export interface RibbonStateItem {
	status: RibbonStatus;
}

export enum RibbonStatus {
	ENABLED = "enabled",
	DISABLED = "disabled",
}

export enum RibbonItemType {
	PREVIOUS = "previous",
	NEXT = "next",
	COPY = "copy",
	SAVE = "save",
	DELETE = "delete",
	OUTLINE = "outline",
	COPY_PATH = "copyPath",
}

const initialState: RibbonState = {
	items: {
		previous: { status: RibbonStatus.ENABLED },
		next: { status: RibbonStatus.ENABLED },
		copy: { status: RibbonStatus.ENABLED },
		save: { status: RibbonStatus.ENABLED },
		delete: { status: RibbonStatus.ENABLED },
		outline: { status: RibbonStatus.ENABLED },
		copyPath: { status: RibbonStatus.ENABLED },
	},
};

export default function ribbonReducer(state = initialState, action: RibbonAction): RibbonState {
	switch (action.type) {
		default:
			return state;
	}
}

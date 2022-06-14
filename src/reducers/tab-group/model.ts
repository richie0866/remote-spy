export interface TabGroupState {
	tabs: TabGroupColumn[];
	activeTab: string;
}

export interface TabGroupColumn {
	id: string;
	caption: string;
	type: TabType;
	canClose: boolean;
}

export enum TabType {
	Home = "home",
	Event = "event",
	Function = "function",
	Script = "script",
}

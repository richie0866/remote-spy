export interface TabGroupState {
	tabs: TabGroupColumn[];
	activeTab: string;
}

export interface TabGroupColumn {
	id: string;
	caption: string;
	icon: string;
	canClose: boolean;
}

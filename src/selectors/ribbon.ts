import { RootState } from "configureStore";
import { RibbonItemType } from "reducers/ribbonReducer";

export const selectRibbonItems = (state: RootState) => state.ribbon.items;
export const selectRibbonItem = (state: RootState, itemType: RibbonItemType) => state.ribbon.items[itemType];

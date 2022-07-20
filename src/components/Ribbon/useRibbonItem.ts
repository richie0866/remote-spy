import { useRootSelector } from "hooks/useRootStore";
import { RibbonItemType } from "reducers/ribbonReducer";
import { selectRibbonItem } from "selectors/ribbon";

export default function useRibbonItem(itemType: RibbonItemType) {
	return useRootSelector((state) => selectRibbonItem(state, itemType));
}

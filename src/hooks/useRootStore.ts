import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "@rbxts/roact-rodux-hooked";
import { RootAction, RootState, RootStore } from "configureStore";

export const useRootSelector = useSelector as TypedUseSelectorHook<RootState>;
export const useRootDispatch = useDispatch as () => (action: RootAction) => void;
export const useRootStore = useStore as () => RootStore;

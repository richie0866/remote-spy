import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import configureStore, { RootStore } from "configureStore";

interface RoduxProviderProps extends Roact.PropsWithChildren {
	store?: RootStore;
}

export default function RoduxProvider({ store = configureStore(), [Roact.Children]: children }: RoduxProviderProps) {
	return <StoreProvider store={store}>{children}</StoreProvider>;
}

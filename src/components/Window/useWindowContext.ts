import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";

interface WindowContextProps {
	size: Roact.Binding<Vector2>;
	position: Roact.Binding<Vector2>;
	maximized: boolean;
	setSize: (size: Vector2) => void;
	setPosition: (position: Vector2) => void;
	setMaximized: (maximized: boolean) => void;
}

export const WindowContext = Roact.createContext<WindowContextProps>(undefined!);

export function useWindowContext() {
	return useContext(WindowContext);
}

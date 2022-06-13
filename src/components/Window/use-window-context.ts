import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";

interface WindowContextProps {
	size: Roact.Binding<Vector2>;
	setSize: (size: Vector2) => void;

	position: Roact.Binding<Vector2>;
	setPosition: (position: Vector2) => void;

	maximized: boolean;
	setMaximized: (maximized: boolean) => void;
}

export const WindowContext = Roact.createContext<WindowContextProps>(undefined!);

export function useWindowContext() {
	return useContext(WindowContext);
}

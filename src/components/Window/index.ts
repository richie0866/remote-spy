import Window from "./Window";
import WindowBackground from "./WindowBackground";
import WindowDropShadow from "./WindowDropShadow";
import WindowMask from "./WindowMask";
import WindowResize from "./WindowResize";
import WindowTitleBar from "./WindowTitleBar";

export default {
	Root: Window,
	TitleBar: WindowTitleBar,
	Mask: WindowMask,
	Background: WindowBackground,
	DropShadow: WindowDropShadow,
	Resize: WindowResize,
};

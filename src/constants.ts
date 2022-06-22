export const DISPLAY_ORDER = 6;
export const SIDE_PANEL_WIDTH = 280;
export const TOPBAR_OFFSET = game.GetService("GuiService").GetGuiInset()[0];

export const IS_LOADED = "__REMOTESPY_IS_LOADED__";
export const IS_ELEVATED = loadstring !== undefined;
export const HAS_FILE_ACCESS = readfile !== undefined;
export const IS_ACRYLIC_ENABLED = true; // game.FindFirstChildWhichIsA("DepthOfFieldEffect") === undefined;

import Roact from "@rbxts/roact";
import { TabGroupColumn } from "./model";

export interface TabGroupStyle {
	font: Roact.InferEnumNames<Enum.Font>;
	fontSize: number;
	maxSize: Vector2;
}

export function getTabCaptionWidth(tab: TabGroupColumn, style: TabGroupStyle) {
	return game.GetService("TextService").GetTextSize(tab.caption, style.fontSize, style.font, style.maxSize).X;
}

export function getTabWidth(tab: TabGroupColumn, style: TabGroupStyle) {
	const captionWidth = getTabCaptionWidth(tab, style);
	const iconWidth = tab.icon !== undefined ? 16 + 6 : 0;
	const closeWidth = tab.canClose ? 16 + 6 : 3;
	return 8 + iconWidth + captionWidth + closeWidth + 8;
}

export function getTabOffset(tabs: TabGroupColumn[], tab: TabGroupColumn, style: TabGroupStyle) {
	let offset = 0;
	for (const t of tabs) {
		if (t === tab) break;
		offset += getTabWidth(t, style);
	}
	return offset;
}

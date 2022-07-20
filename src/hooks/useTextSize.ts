import { useMemo } from "@rbxts/roact-hooked";
import { TextService } from "@rbxts/services";

export default function useTextSize(
	text: string | undefined,
	fontSize: number,
	font: CastsToEnum<Enum.Font>,
	maxSize: Vector2,
) {
	const textSize = useMemo(() => {
		return text === undefined ? new Vector2() : TextService.GetTextSize(text, fontSize, font, maxSize);
	}, [text, fontSize, font, maxSize]);

	return textSize;
}

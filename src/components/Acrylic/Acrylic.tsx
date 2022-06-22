import AcrylicImpl from "./AcrylicImpl";
import Roact from "@rbxts/roact";
import { IS_ACRYLIC_ENABLED } from "constants";

interface Props {
	distance?: number;
}

export default function Acrylic({ distance }: Props) {
	if (!IS_ACRYLIC_ENABLED) {
		return <></>;
	}
	return <AcrylicImpl distance={distance} />;
}

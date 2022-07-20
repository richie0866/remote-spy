import Roact from "@rbxts/roact";
import { withHooksPure } from "@rbxts/roact-hooked";
import Container from "components/Container";
import { useRootDispatch } from "hooks/useRootStore";
import { RibbonItemType } from "reducers/ribbonReducer";
import RibbonDivider from "./RibbonDivider";
import RibbonItem from "./RibbonItem";

function Ribbon() {
	const dispatch = useRootDispatch();

	return (
		<Container size={new UDim2(1, -8, 0, 36)} position={new UDim2(0, 8, 0, 42)}>
			<RibbonItem itemType={RibbonItemType.PREVIOUS} icon="rbxassetid://9887696242" />

			<RibbonItem itemType={RibbonItemType.NEXT} icon="rbxassetid://9887978919" />

			<RibbonDivider />

			<RibbonItem itemType={RibbonItemType.COPY} icon="rbxassetid://9887696628" />

			<RibbonItem itemType={RibbonItemType.SAVE} icon="rbxassetid://9932819855" />

			<RibbonItem itemType={RibbonItemType.DELETE} icon="rbxassetid://9887696922" />

			<RibbonDivider />

			<RibbonItem itemType={RibbonItemType.OUTLINE} icon="rbxassetid://9887697255" caption="Outline" />

			<RibbonItem itemType={RibbonItemType.COPY_PATH} icon="rbxassetid://9887696922" caption="Copy path" />

			<uilistlayout Padding={new UDim(0, 4)} FillDirection="Horizontal" HorizontalAlignment="Left" />
		</Container>
	);
}

export default withHooksPure(Ribbon);

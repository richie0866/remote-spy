import Container from "components/Container";
import Remote from "./Remote";
import Roact from "@rbxts/roact";
import { arrayToMap } from "@rbxts/roact-hooked-plus";
import { pure, useEffect } from "@rbxts/roact-hooked";
import { selectRemoteIdSelected, setSelectedRemoteId } from "reducers/action-bar";
import { selectRemoteLogIds } from "reducers/remote-log/selectors";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

interface Props {
	pageSelected: boolean;
}

function Home({ pageSelected }: Props) {
	const dispatch = useRootDispatch();
	const remoteLogIds = useRootSelector(selectRemoteLogIds);
	const selection = useRootSelector(selectRemoteIdSelected);

	useEffect(() => {
		if (selection !== undefined && !remoteLogIds.includes(selection)) {
			dispatch(setSelectedRemoteId(undefined));
		}
	}, [remoteLogIds]);

	return (
		<scrollingframe
			ScrollBarThickness={0}
			ScrollBarImageTransparency={1}
			CanvasSize={new UDim2(0, 0, 0, (remoteLogIds.size() + 1) * (64 + 4))}
			Size={new UDim2(1, 0, 1, 0)}
			BorderSizePixel={0}
			BackgroundTransparency={1}
		>
			<uipadding PaddingLeft={new UDim(0, 12)} PaddingRight={new UDim(0, 12)} PaddingTop={new UDim(0, 12)} />
			<uilistlayout
				Padding={new UDim(0, 4)}
				FillDirection="Vertical"
				HorizontalAlignment="Center"
				VerticalAlignment="Top"
			/>
			{arrayToMap(remoteLogIds, (id) => [
				id,
				<Remote
					id={id}
					selected={selection === id}
					onClick={() =>
						selection !== id ? dispatch(setSelectedRemoteId(id)) : dispatch(setSelectedRemoteId(undefined))
					}
				/>,
			])}
		</scrollingframe>
	);
}

export default pure(Home);

import Container from "components/Container";
import Roact from "@rbxts/roact";
import Row from "./Row";
import { Instant, Spring } from "@rbxts/flipper";
import { RunService } from "@rbxts/services";
import { arrayToMap, useSingleMotor, useSpring } from "@rbxts/roact-hooked-plus";
import { pure, useBinding, useEffect, useMemo, useMutable } from "@rbxts/roact-hooked";
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

	// Deselect the remote if the page is deselected.
	useEffect(() => {
		if (!pageSelected && selection) {
			dispatch(setSelectedRemoteId(undefined));
		}
	}, [pageSelected]);

	// Deselect the remote if it is no longer in the list.
	useEffect(() => {
		if (selection !== undefined && !remoteLogIds.includes(selection)) {
			dispatch(setSelectedRemoteId(undefined));
		}
	}, [remoteLogIds]);

	const [indicatorOffset, setIndicatorOffset] = useSingleMotor(-100);
	const indicatorHeight = useSpring(selection === undefined ? 0 : 20, { frequency: 8 });
	const lastSelection = useMutable(selection);

	// Update the indicator offset when the selection changes.
	useEffect(() => {
		if (selection !== undefined) {
			const y = remoteLogIds.indexOf(selection) * (64 + 4);
			setIndicatorOffset(lastSelection.current === undefined ? new Instant(y) : new Spring(y, { frequency: 5 }));
		}
		lastSelection.current = selection;
	}, [selection]);

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

			<Container
				size={new UDim2(0, 4, 0, 64)}
				position={indicatorOffset.map((y) => new UDim2(0, 0, 0, math.round(y)))}
			>
				<frame
					AnchorPoint={new Vector2(0, 0.5)}
					Size={indicatorHeight.map((y) => new UDim2(0, 4, 0, y))}
					Position={new UDim2(0, 0, 0.5, 0)}
					BackgroundColor3={Color3.fromHex("#4CC2FF")}
				>
					<uicorner CornerRadius={new UDim(0, 2)} />
				</frame>
			</Container>

			{arrayToMap(remoteLogIds, (id, order) => [
				id,
				<Row
					id={id}
					order={order}
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

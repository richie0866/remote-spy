import Container from "components/Container";
import Header from "./Header";
import Roact from "@rbxts/roact";
import Row from "./Row";
import Selection from "components/Selection";
import { arrayToMap } from "@rbxts/roact-hooked-plus";
import { makeSelectRemoteLogOutgoing, selectSignalIdSelected } from "reducers/remote-log";
import { useBinding, useMemo, withHooksPure } from "@rbxts/roact-hooked";
import { useRootSelector } from "hooks/use-root-store";

interface Props {
	id: string;
}

function Logger({ id }: Props) {
	const selectOutgoing = useMemo(makeSelectRemoteLogOutgoing, []);

	const outgoing = useRootSelector((state) => selectOutgoing(state, id));
	const selection = useRootSelector(selectSignalIdSelected);
	const selectionOrder = useMemo(
		() => outgoing?.findIndex((signal) => signal.id === selection) ?? -1,
		[outgoing, selection],
	);

	const [contentHeight, setContentHeight] = useBinding(0);

	if (!outgoing) {
		return <></>;
	}

	return (
		<scrollingframe
			CanvasSize={contentHeight.map((h) => new UDim2(0, 0, 0, h + 48))}
			ScrollBarThickness={0}
			ScrollBarImageTransparency={1}
			Size={new UDim2(1, 0, 1, 0)}
			BorderSizePixel={0}
			BackgroundTransparency={1}
		>
			<uipadding PaddingLeft={new UDim(0, 12)} PaddingRight={new UDim(0, 12)} PaddingTop={new UDim(0, 12)} />

			<Selection
				height={64}
				offset={selection !== undefined && selectionOrder !== -1 ? (selectionOrder + 1) * (64 + 4) : undefined}
				hasSelection={selection !== undefined && selectionOrder !== -1}
			/>

			<Container>
				<uilistlayout
					Change={{
						AbsoluteContentSize: (rbx) => setContentHeight(rbx.AbsoluteContentSize.Y),
					}}
					SortOrder="LayoutOrder"
					FillDirection="Vertical"
					Padding={new UDim(0, 4)}
					VerticalAlignment="Top"
				/>

				<Header id={id} />

				{arrayToMap(outgoing, (signal, order) => [
					signal.id,
					<Row signal={signal} order={order} selected={selection === signal.id} />,
				])}
			</Container>
		</scrollingframe>
	);
}

export default withHooksPure(Logger);

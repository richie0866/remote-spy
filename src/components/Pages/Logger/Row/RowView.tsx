import Container from "components/Container";
import Roact from "@rbxts/roact";
import RowBody from "./RowBody";
import RowHeader from "./RowHeader";
import { OutgoingSignal, toggleSignalSelected } from "reducers/remote-log";
import { useBinding, useCallback, withHooksPure } from "@rbxts/roact-hooked";
import { useRootDispatch } from "hooks/use-root-store";

interface Props {
	signal: OutgoingSignal;
	selected: boolean;
	onHeightChange: (height: number) => void;
}

function RowView({ signal, selected, onHeightChange }: Props) {
	const dispatch = useRootDispatch();
	const [contentHeight, setContentHeight] = useBinding(0);

	const toggle = useCallback(() => dispatch(toggleSignalSelected(signal.remoteId, signal.id)), []);

	return (
		<>
			<RowHeader signal={signal} open={selected} onClick={toggle} />

			<Container
				clipChildren
				size={contentHeight.map((y) => new UDim2(1, 0, 0, y))}
				position={new UDim2(0, 0, 0, 64)}
			>
				<uilistlayout
					Change={{
						AbsoluteContentSize: ({ AbsoluteContentSize }) => {
							setContentHeight(AbsoluteContentSize.Y);
							onHeightChange(AbsoluteContentSize.Y);
						},
					}}
					SortOrder="LayoutOrder"
					FillDirection="Vertical"
					Padding={new UDim()}
					VerticalAlignment="Top"
				/>
				{selected && <RowBody signal={signal} />}
			</Container>
		</>
	);
}

export default withHooksPure(RowView);

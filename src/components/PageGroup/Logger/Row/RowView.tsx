import Container from "components/Container";
import Roact from "@rbxts/roact";
import RowBody from "./RowBody";
import RowHeader from "./RowHeader";
import { OutgoingSignal } from "reducers/remote-log";
import { pure, useBinding, useCallback, useState } from "@rbxts/roact-hooked";

interface Props {
	signal: OutgoingSignal;
	onHeightChange: (height: number) => void;
	onOpen: (open: boolean) => void;
}

function RowView({ signal, onHeightChange, onOpen }: Props) {
	const [open, setOpen] = useState(false);
	const [contentHeight, setContentHeight] = useBinding(0);

	const toggle = useCallback(
		() =>
			setOpen((open) => {
				task.defer(() => onOpen(!open));
				return !open;
			}),
		[],
	);

	return (
		<>
			<RowHeader signal={signal} open={open} onClick={toggle} />

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
				{open && <RowBody signal={signal} />}
			</Container>
		</>
	);
}

export default pure(RowView);

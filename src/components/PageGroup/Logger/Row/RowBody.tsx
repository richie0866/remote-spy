import Roact from "@rbxts/roact";
import RowCaption from "./RowCaption";
import RowDoubleCaption from "./RowDoubleCaption";
import RowLine from "./RowLine";
import { HttpService } from "@rbxts/services";
import { OutgoingSignal } from "reducers/remote-log";
import { describeFunction } from "utils/function-util";
import { pure, useCallback, useMemo } from "@rbxts/roact-hooked";

interface Props {
	signal: OutgoingSignal;
}

function RowBody({ signal }: Props) {
	const description = useMemo(() => describeFunction(signal.callback), []);

	const tracebackNames = useMemo(() => {
		const mapped = signal.traceback.map((traceback) => {
			const description = describeFunction(traceback);
			const params = [];

			for (let i = 0; i < description.parameters; i++) {
				params.push(string.char(string.byte("A")[0] + i));
			}

			if (description.variadic) {
				params.push("...");
			}

			return `${description.name}(${params.join(", ")})`;
		});
		const length = mapped.size();

		// Reverse order so that the remote caller is last.
		for (let i = 0; i < length / 2; i++) {
			const temp = mapped[i];
			mapped[i] = mapped[length - i - 1];
			mapped[length - i - 1] = temp;
		}

		// Highlight the remote caller.
		mapped[length - 1] = `→ ${mapped[length - 1]} ←`;

		return mapped;
	}, []);

	const stringifyTypesAndValues = useCallback((list: Record<number, unknown>) => {
		const types = [];
		const values = [];

		for (const [index, value] of pairs(list)) {
			if (index > 12) {
				types.push("...");
				break;
			}
			types.push(typeOf(value));
		}

		for (const [, value] of pairs(list)) {
			if (typeIs(value, "string")) {
				values.push(string.format("%q", value));
			} else if (typeIs(value, "table")) {
				const result = opcall(() => HttpService.JSONEncode(value));
				values.push(result.success ? result.value : "Could not encode JSON");
			} else {
				values.push(tostring(value));
			}
		}

		return [types, values];
	}, []);

	const [parameterTypes, parameterValues] = useMemo(() => stringifyTypesAndValues(signal.parameters), []);
	const [returnTypes, returnValues] = useMemo(
		() => (signal.returns ? stringifyTypesAndValues(signal.returns) : []),
		[],
	);

	return (
		<>
			<RowLine />

			<frame
				AutomaticSize="Y"
				Size={new UDim2(1, 0, 0, 0)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.98}
				BorderSizePixel={0}
			>
				<RowCaption text="Remote name" description={signal.name} wrapped />
				<RowCaption text="Remote location" description={signal.path} wrapped />

				<uipadding
					PaddingLeft={new UDim(0, 58)}
					PaddingRight={new UDim(0, 58)}
					PaddingTop={new UDim(0, 6)}
					PaddingBottom={new UDim(0, 6)}
				/>
				<uilistlayout FillDirection="Vertical" Padding={new UDim()} VerticalAlignment="Top" />
			</frame>

			{parameterTypes.size() > 0 && (
				<>
					<RowLine />

					<frame
						AutomaticSize="Y"
						Size={new UDim2(1, 0, 0, 0)}
						BackgroundColor3={new Color3(1, 1, 1)}
						BackgroundTransparency={0.98}
						BorderSizePixel={0}
					>
						<RowDoubleCaption
							text="Parameters"
							hint={parameterTypes.join("\n")}
							description={parameterValues.join("\n")}
						/>
						{returnTypes && (
							<RowDoubleCaption
								text="Returns"
								hint={returnTypes.join("\n")}
								description={returnValues.join("\n")}
							/>
						)}

						<uipadding
							PaddingLeft={new UDim(0, 58)}
							PaddingRight={new UDim(0, 58)}
							PaddingTop={new UDim(0, 6)}
							PaddingBottom={new UDim(0, 6)}
						/>
						<uilistlayout FillDirection="Vertical" Padding={new UDim()} VerticalAlignment="Top" />
					</frame>
				</>
			)}

			<RowLine />

			<imagelabel
				AutomaticSize="Y"
				Image={"rbxassetid://9913871236"}
				ImageColor3={new Color3(1, 1, 1)}
				ImageTransparency={0.98}
				ScaleType="Slice"
				SliceCenter={new Rect(4, 4, 4, 4)}
				Size={new UDim2(1, 0, 0, 0)}
				BackgroundTransparency={1}
			>
				<RowCaption text="Function name" description={description.name} wrapped />
				<RowCaption text="Source" description={description.source} wrapped />
				<RowCaption text="Traceback" wrapped description={"• " + tracebackNames.join("\n• ")} />

				<uipadding
					PaddingLeft={new UDim(0, 58)}
					PaddingRight={new UDim(0, 58)}
					PaddingTop={new UDim(0, 6)}
					PaddingBottom={new UDim(0, 6)}
				/>
				<uilistlayout FillDirection="Vertical" Padding={new UDim()} VerticalAlignment="Top" />
			</imagelabel>
		</>
	);
}

export default pure(RowBody);

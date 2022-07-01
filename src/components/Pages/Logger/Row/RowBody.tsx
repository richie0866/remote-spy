import Roact from "@rbxts/roact";
import RowCaption from "./RowCaption";
import RowDoubleCaption from "./RowDoubleCaption";
import RowLine from "./RowLine";
import { OutgoingSignal, stringifySignalTraceback } from "reducers/remote-log";
import { codify } from "utils/codify";
import { describeFunction, stringifyFunctionSignature } from "utils/function-util";
import { formatEscapes } from "utils/format-escapes";
import { getInstancePath } from "utils/instance-util";
import { useMemo, withHooksPure } from "@rbxts/roact-hooked";

interface Props {
	signal: OutgoingSignal;
}

function stringifyTypesAndValues(list: Record<number, unknown>) {
	const types = [];
	const values = [];

	for (const [index, value] of pairs(list)) {
		if (index > 12) {
			types.push("...");
			values.push("...");
			break;
		}
		if (typeIs(value, "Instance")) {
			types.push(value.ClassName);
		} else {
			types.push(typeOf(value));
		}
		values.push(formatEscapes(codify(value, -1).sub(1, 256)));
	}

	return [types, values] as const;
}

function RowBody({ signal }: Props) {
	const description = useMemo(() => describeFunction(signal.callback), []);
	const tracebackNames = useMemo(() => stringifySignalTraceback(signal), []);

	const [parameterTypes, parameterValues] = useMemo(() => stringifyTypesAndValues(signal.parameters), []);
	const [returnTypes, returnValues] = useMemo(
		() => (signal.returns ? stringifyTypesAndValues(signal.returns) : [["void"], ["void"]]),
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
				<RowCaption text="Remote name" description={formatEscapes(signal.name)} wrapped />
				<RowCaption text="Remote location" description={formatEscapes(signal.path)} wrapped />
				<RowCaption
					text="Remote caller"
					description={signal.caller ? formatEscapes(getInstancePath(signal.caller)) : "No script found"}
					wrapped
				/>

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
				<RowCaption text="Signature" description={stringifyFunctionSignature(signal.callback)} wrapped />
				<RowCaption text="Source" description={description.source} wrapped />
				<RowCaption text="Traceback" wrapped description={tracebackNames.join("\n")} />

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

export default withHooksPure(RowBody);

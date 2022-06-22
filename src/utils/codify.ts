import { getInstancePath } from "./instance-util";

const transformers: Record<string, Callback> = {
	table: (value: object, level: number) => (level === -1 ? codifyTableFlat(value) : codifyTable(value, level + 1)),
	string: (value: string) => string.format("%q", value.gsub("\n", "\\n")[0]),
	number: (value: number) => tostring(value),
	boolean: (value: boolean) => tostring(value),
	Instance: (value: Instance) => getInstancePath(value),
	BrickColor: (value: BrickColor) => `BrickColor.new("${value.Name}")`,
	Color3: (value: Color3) => `Color3.new(${value.R}, ${value.G}, ${value.B})`,
	ColorSequenceKeypoint: (value: ColorSequenceKeypoint) =>
		`ColorSequenceKeypoint.new(${value.Time}, ${codify(value.Value)})`,
	ColorSequence: (value: ColorSequence) => `ColorSequence.new(${codify(value.Keypoints)})`,
	NumberRange: (value: NumberRange) => `NumberRange.new(${value.Min}, ${value.Max})`,
	NumberSequenceKeypoint: (value: NumberSequenceKeypoint) =>
		`NumberSequenceKeypoint.new(${value.Time}, ${codify(value.Value)})`,
	NumberSequence: (value: NumberSequence) => `NumberSequence.new(${codify(value.Keypoints)})`,
	Vector3: (value: Vector3) => `Vector3.new(${value.X}, ${value.Y}, ${value.Z})`,
	Vector2: (value: Vector2) => `Vector2.new(${value.X}, ${value.Y})`,
	UDim2: (value: UDim2) => `UDim2.new(${value.X.Scale}, ${value.X.Offset}, ${value.Y.Scale}, ${value.Y.Offset})`,
	Ray: (value: Ray) => `Ray.new(${codify(value.Origin)}, ${codify(value.Direction)})`,
	CFrame: (value: CFrame) => `CFrame.new(${value.GetComponents().join(", ")})`,
};

export function codify(value: unknown, level = 0): string {
	const transformer = transformers[typeOf(value)];
	if (transformer) {
		return transformer(value, level);
	} else {
		return `${tostring(value)} --[[${typeOf(value)} not supported]]`;
	}
}

export function codifyTable(object: object, level = 0): string {
	const lines = [];
	const indent = string.rep("	", level + 1);

	for (const [key, value] of pairs(object)) {
		if (typeIs(value, "function") || typeIs(value, "thread")) {
			continue;
		}
		lines.push(`${indent}[${codify(key, level)}] = ${codify(value, level)}`);
	}

	if (lines.size() === 0) {
		return "{}";
	}

	return `{\n${lines.join(",\n")}\n${indent.sub(1, -2)}}`;
}

export function codifyTableFlat(object: object): string {
	const lines = [];

	for (const [key, value] of pairs(object)) {
		if (typeIs(value, "function") || typeIs(value, "thread")) {
			continue;
		}
		lines.push(`[${codify(key, -1)}] = ${codify(value, -1)}`);
	}

	if (lines.size() === 0) {
		return "{}";
	}

	return `{ ${lines.join(", ")} }`;
}

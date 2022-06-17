const idsByObject = new Map<Instance, string>();
const objectsById = new Map<string, Instance>();
let nextId = 0;

const hasSpecialCharacters = (str: string) => str.match("[a-zA-Z0-9_]+")[0] !== str;

export function getInstanceId(object: Instance): string {
	if (!idsByObject.has(object)) {
		const id = `instance-${nextId++}`;
		idsByObject.set(object, id);
		objectsById.set(id, object);
	}
	return idsByObject.get(object)!;
}

export function getInstanceFromId(id: string): Instance | undefined {
	return objectsById.get(id);
}

export function getInstancePath(object: Instance) {
	let path = "";
	let current: Instance | undefined = object;
	let isInDataModel = false;

	do {
		if (current === game) {
			path = `game${path}`;
			isInDataModel = true;
		} else if (current.Parent === game) {
			path = `:GetService(${string.format("%q", current.ClassName)})${path}`;
		} else {
			path = hasSpecialCharacters(current.Name)
				? `[${string.format("%q", current.Name)}]${path}`
				: `.${current.Name}${path}`;
		}
		current = current.Parent;
	} while (current);

	if (!isInDataModel) {
		path = "(nil)" + path;
	}

	// Reformatting
	[path] = path.gsub('^game:GetService%("Workspace"%)', "workspace");

	return path;
}

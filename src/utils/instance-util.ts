const idsByObject = new Map<Instance, string>();
const objectsById = new Map<string, Instance>();
let nextId = 0;

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

export function getSafePath(object: Instance) {
	let path = `[${string.format("%q", object.Name)}]`;
	let parent = object.Parent;
	let isInDataModel = false;

	while (parent) {
		if (parent === game) {
			path = `game${path}`;
			isInDataModel = true;
		} else if (parent.Parent === game) {
			path = `:GetService(${string.format("%q", parent.ClassName)})${path}`;
		} else {
			path = `[${string.format("%q", parent.Name)}]${path}`;
		}
		parent = parent.Parent;
	}

	if (!isInDataModel) {
		path = "(nil)" + path;
	}

	return path;
}

export function getDisplayPath(object: Instance) {
	let path = `.${object.Name}`;
	let parent = object.Parent;
	let isInDataModel = false;

	while (parent) {
		if (parent === game) {
			path = `game${path}`;
			isInDataModel = true;
		} else if (parent.Parent === game) {
			path = `:GetService(${string.format("%q", parent.ClassName)})${path}`;
		} else {
			path = `.${parent.Name}${path}`;
		}
		parent = parent.Parent;
	}

	if (!isInDataModel) {
		path = "(nil)" + path;
	}

	return path;
}

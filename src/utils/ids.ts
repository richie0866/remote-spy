const idsByObject = new Map<Instance, string>();
let nextId = 0;

export function getObjectId(object: Instance): string {
	if (!idsByObject.has(object)) {
		idsByObject.set(object, `object-${nextId++}`);
	}
	return idsByObject.get(object)!;
}

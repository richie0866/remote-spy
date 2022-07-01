import Roact from "@rbxts/roact";

export default function withCollection<T extends Roact.AnyComponent, U extends Record<string, Roact.AnyComponent>>(
	component: T,
	collection: U,
): T & U {
	for (const [k, v] of pairs(collection)) {
		component[k as never] = v as never;
	}

	return component as T & U;
}

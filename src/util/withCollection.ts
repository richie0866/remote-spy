import Roact from "@rbxts/roact";

type AnyComponent = Roact.FunctionComponent<any> | Roact.ComponentConstructor<any>;

export default function withCollection<T extends AnyComponent, U extends Record<string, AnyComponent>>(
	component: T,
	collection: U,
): T & U {
	for (const [k, v] of pairs(collection)) {
		component[k as never] = v as never;
	}

	return component as T & U;
}

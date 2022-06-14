import App from "./App";
import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "store";
import { createOutgoingSignal, createRemoteLog, pushRemoteLog } from "reducers/remote-log";
import { pure } from "@rbxts/roact-hooked";
import { useRootDispatch } from "hooks/use-root-store";

const rng = new Random();

function exampleFn() {}
function exampleCaller_1() {
	exampleFn();
}
function exampleCaller_2() {
	exampleCaller_1();
}

const Dispatcher = pure(() => {
	const dispatch = useRootDispatch();

	const names = [
		"SendMessage",
		"UpdateCameraLook",
		"TryGetValue",
		"GetEnumerator",
		"ToString",
		"RequestStoreState",
		"ReallyLongNameForSomeReasonToMakeSureItFitsInTheList",
		"PurchaseProduct",
		"IsMessaging",
		"TestDispatcher",
		"RequestAction",
	];

	for (const name of names) {
		const className = rng.NextInteger(0, 1) === 1 ? "RemoteEvent" : "RemoteFunction";

		const remote = {
			Name: name,
			Parent: game.GetService("ReplicatedStorage"),
			IsA(name: string) {
				return className === name;
			},
			GetFullName() {
				return `ReplicatedStorage.${name}`;
			},
		} as unknown as RemoteEvent;

		const firstSignal = createOutgoingSignal([12, "Hello", true], exampleFn, [
			exampleFn,
			exampleCaller_1,
			exampleCaller_2,
		]);
		const remoteLog = createRemoteLog(remote, rng.NextInteger(0, 2) === 1 ? firstSignal : undefined);

		dispatch(pushRemoteLog(remoteLog));
	}

	return <></>;
});

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			{/* <Root>
				<imagelabel Image="rbxassetid://9897110309" Size={new UDim2(1, 0, 1, 0)} ScaleType="Crop" />
			</Root> */}
			<Dispatcher />
			<App />
		</Provider>,
		target,
		"App",
	);

	return () => {
		Roact.unmount(handle);
	};
};

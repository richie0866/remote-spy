import App from "./App";
import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "store";
import { createOutgoingSignal, createRemoteLog, pushOutgoingSignal, pushRemoteLog } from "reducers/remote-log";
import { getInstanceId } from "utils/instance-util";
import { useRootDispatch } from "hooks/use-root-store";
import { withHooksPure } from "@rbxts/roact-hooked";

const rng = new Random();

function testFn(x?: number, y?: number) {}
function testFnCaller(x?: number, ...args: number[]) {
	testFn();
}
function topLevelCaller(x?: number, y?: number, z?: number) {
	testFnCaller();
}

const Dispatcher = withHooksPure(() => {
	const dispatch = useRootDispatch();

	const names = [
		"SendMessage",
		"UpdateCameraLook",
		"TryGetValue",
		"GetEnumerator",
		"ToString",
		"RequestStoreState",
		"ReallyLongNameForSomeReason \n ☆*: .｡. o(≧▽≦)o .｡.:*☆ \n Lol",
		"PurchaseProduct",
		"IsMessaging",
		"TestDispatcher",
		"RequestAction",
	];

	for (const name of names) {
		const className = rng.NextInteger(0, 1) === 1 ? "RemoteEvent" : "RemoteFunction";
		const remote = {
			Name: name,
			ClassName: className,
			Parent: game.GetService("ReplicatedStorage"),
			IsA(name: string) {
				return className === name;
			},
			GetFullName() {
				return `ReplicatedStorage.${name}`;
			},
		} as unknown as RemoteEvent;

		dispatch(pushRemoteLog(createRemoteLog(remote)));

		const max = rng.NextInteger(-3, 30);
		for (let i = 0; i < max; i++) {
			if (i < 0) break;
			const signal = createOutgoingSignal(
				remote,
				undefined,
				testFn,
				[testFn, testFnCaller, topLevelCaller],
				[
					"Hello",
					rng.NextInteger(100, 1000),
					{ message: "Hello, world!", receivers: [] },
					rng.NextInteger(100, 1000),
					game.GetService("Workspace"),
				],
			);
			dispatch(pushOutgoingSignal(getInstanceId(remote), signal));
		}
	}

	return <></>;
});

export = (target: Frame) => {
	const handle = Roact.mount(
		<StoreProvider store={configureStore()}>
			{/* <Root>
				<imagelabel Image="rbxassetid://9897110309" Size={new UDim2(1, 0, 1, 0)} ScaleType="Crop" />
			</Root> */}
			<Dispatcher />
			<App />
		</StoreProvider>,
		target,
		"App",
	);

	return () => {
		Roact.unmount(handle);
	};
};

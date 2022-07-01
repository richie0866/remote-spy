import Roact from "@rbxts/roact";
import { TabType, deleteTab, selectActiveTab } from "reducers/tab-group";
import { codifyOutgoingSignal, stringifyRemote } from "./utils";
import { getInstanceFromId, getInstancePath } from "utils/instance-util";
import {
	makeSelectRemoteLog,
	removeOutgoingSignal,
	selectRemoteIdSelected,
	selectSignalSelected,
} from "reducers/remote-log";
import { removeRemoteLog } from "reducers/remote-log";
import { setActionEnabled } from "reducers/action-bar";
import { useActionEffect } from "hooks/use-action-effect";
import { useEffect, withHooksPure } from "@rbxts/roact-hooked";
import { useRootDispatch, useRootSelector, useRootStore } from "hooks/use-root-store";

const selectRemoteLog = makeSelectRemoteLog();

function ActionBarEffects() {
	const store = useRootStore();
	const dispatch = useRootDispatch();

	const currentTab = useRootSelector(selectActiveTab);

	const remoteId = useRootSelector(selectRemoteIdSelected);
	const remote = useRootSelector((state) => (remoteId !== undefined ? selectRemoteLog(state, remoteId) : undefined));

	const signal = useRootSelector(selectSignalSelected);

	useActionEffect("copy", () => {
		if (remote) {
			setclipboard?.(getInstancePath(remote.object));
		} else if (signal) {
			setclipboard?.(codifyOutgoingSignal(signal));
		}
	});

	useActionEffect("copyPath", () => {
		const object = remote?.object ?? (currentTab && getInstanceFromId(currentTab.id));
		if (object) {
			setclipboard?.(getInstancePath(object));
		}
	});

	useActionEffect("save", () => {
		if (remote) {
			const [remoteName] = getInstancePath(remote.object).sub(-66, -1).gsub("[^a-zA-Z0-9]+", "_");

			const fileName = `${remoteName}.txt`;
			const fileContents = stringifyRemote(remote);

			writefile?.(fileName, fileContents);
		} else if (signal) {
			const remote = selectRemoteLog(store.getState(), signal.remoteId)!;
			const signalOrder = remote.outgoing.findIndex((s) => s.id === signal.id);

			const [remoteName] = getInstancePath(remote.object).sub(-66, -1).gsub("[^a-zA-Z0-9]+", "_");

			const fileName = `${remoteName}_Signal${signalOrder + 1}.txt`;
			const fileContents = stringifyRemote(remote, (s) => signal.id === s.id);

			writefile?.(fileName, fileContents);
		}
	});

	useActionEffect("delete", () => {
		if (remote) {
			dispatch(removeRemoteLog(remote.id));
			dispatch(deleteTab(remote.id));
		} else if (signal) {
			dispatch(removeOutgoingSignal(signal.remoteId, signal.id));
		}
	});

	// Remote & Signal actions
	useEffect(() => {
		const remoteEnabled = remoteId !== undefined;
		const signalEnabled = signal !== undefined && currentTab?.id === signal.remoteId;
		const isHome = currentTab?.type === TabType.Home;

		dispatch(setActionEnabled("copy", remoteEnabled || signalEnabled));
		dispatch(setActionEnabled("save", remoteEnabled || signalEnabled));
		dispatch(setActionEnabled("delete", remoteEnabled || signalEnabled));

		dispatch(setActionEnabled("traceback", signalEnabled));
		dispatch(setActionEnabled("copyPath", remoteEnabled || !isHome));
	}, [remoteId === undefined, signal, currentTab]);

	return <></>;
}

export default withHooksPure(ActionBarEffects);

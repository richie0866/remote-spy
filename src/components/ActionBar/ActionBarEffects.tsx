import Roact from "@rbxts/roact";
import { TabType, deleteTab, selectActiveTab } from "reducers/tab-group";
import { getInstanceFromId, getSafePath } from "utils/instance-util";
import { makeSelectRemoteLog } from "reducers/remote-log/selectors";
import { pure, useEffect } from "@rbxts/roact-hooked";
import { removeRemoteLog } from "reducers/remote-log";
import { selectRemoteIdSelected, setActionDisabled } from "reducers/action-bar";
import { useActionEffect } from "hooks/use-action-effect";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

const selectRemoteLog = makeSelectRemoteLog();

function ActionBarEffects() {
	const dispatch = useRootDispatch();

	const remoteId = useRootSelector(selectRemoteIdSelected);
	const remote = useRootSelector((state) => (remoteId !== undefined ? selectRemoteLog(state, remoteId) : undefined));
	const currentTab = useRootSelector(selectActiveTab);

	useActionEffect("copy", () => {
		if (!remote) return;
		setclipboard ? setclipboard(getSafePath(remote.object)) : print("Copy", getSafePath(remote.object));
	});

	useActionEffect("copyPath", () => {
		const object = remote?.object ?? (currentTab && getInstanceFromId(currentTab.id));
		if (object) {
			setclipboard ? setclipboard(getSafePath(object)) : print("Copy", getSafePath(object));
		}
	});

	useActionEffect("delete", () => {
		if (!remote) return;
		dispatch(removeRemoteLog(remote.id));
		dispatch(deleteTab(remote.id));
	});

	useEffect(() => {
		dispatch(setActionDisabled("copy", remoteId === undefined));
		dispatch(setActionDisabled("delete", remoteId === undefined));
	}, [remoteId === undefined]);

	useEffect(() => {
		if (currentTab?.type === TabType.Home) {
			dispatch(setActionDisabled("copyPath", remoteId === undefined));
		} else {
			dispatch(setActionDisabled("copyPath", false));
		}
	}, [remoteId === undefined, currentTab?.type]);

	return <></>;
}

export default pure(ActionBarEffects);

import Roact from "@rbxts/roact";
import { deleteTab } from "reducers/tab-group";
import { pure, useEffect } from "@rbxts/roact-hooked";
import { removeRemoteLog } from "reducers/remote-log";
import { selectRemoteIdSelected, setActionDisabled } from "reducers/action-bar";
import { selectRemoteLog } from "reducers/remote-log/selectors";
import { useActionEffect } from "hooks/use-action-effect";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

function ActionBarEffects() {
	const dispatch = useRootDispatch();

	const remoteId = useRootSelector(selectRemoteIdSelected);
	const remote = useRootSelector((state) => (remoteId !== undefined ? selectRemoteLog(state, remoteId) : undefined));

	useActionEffect("copy", () => {
		if (!remote) return;
		setclipboard ? setclipboard(remote.object.GetFullName()) : print("Copy", remote.object.GetFullName());
	});

	useActionEffect("copyPath", () => {
		if (!remote) return;
		print("Copy", remote.object.GetFullName());
	});

	useActionEffect("delete", () => {
		if (!remote) return;
		dispatch(removeRemoteLog(remote.id));
		dispatch(deleteTab(remote.id));
	});

	useEffect(() => {
		dispatch(setActionDisabled("copy", remoteId === undefined));
		dispatch(setActionDisabled("delete", remoteId === undefined));
		dispatch(setActionDisabled("copyPath", remoteId === undefined));
	}, [remoteId === undefined]);

	return <></>;
}

export default pure(ActionBarEffects);

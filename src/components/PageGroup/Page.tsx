import Container from "components/Container";
import Event from "./components/Event";
import Function from "./components/Function";
import Home from "./components/Home";
import Roact from "@rbxts/roact";
import Script from "./components/Script";
import { Instant, Spring } from "@rbxts/flipper";
import { TabType, selectActiveTabId, selectActiveTabOrder, selectTabOrder, selectTabType } from "reducers/tab-group";
import { pure, useEffect, useMutable } from "@rbxts/roact-hooked";
import { useRootSelector } from "hooks/use-root-store";
import { useSingleMotor } from "@rbxts/roact-hooked-plus";

interface Props {
	id: string;
}

function Page({ id }: Props) {
	const tabType = useRootSelector((state) => selectTabType(state, id));
	const tabOrder = useRootSelector((state) => selectTabOrder(state, id));

	const activeTabOrder = useRootSelector(selectActiveTabOrder);
	const activeTabId = useRootSelector(selectActiveTabId);
	const lastActiveTabId = useMutable("");

	const targetSide = tabOrder < activeTabOrder ? -1 : tabOrder > activeTabOrder ? 1 : 0;
	const [side, setSide] = useSingleMotor(targetSide === 0 ? 1 : targetSide);

	useEffect(() => {
		const isOrWasActive = id === activeTabId || id === lastActiveTabId.current;
		const activeTabChanged = activeTabId !== lastActiveTabId.current;

		if (isOrWasActive && activeTabChanged) {
			setSide(new Spring(targetSide));
		} else {
			setSide(new Instant(targetSide));
		}
	}, [targetSide]);

	useEffect(() => {
		lastActiveTabId.current = activeTabId;
	});

	return (
		<Container position={side.map((s) => new UDim2(s, 0, 0, 0))}>
			{tabType === TabType.Event ? (
				<Event />
			) : tabType === TabType.Function ? (
				<Function />
			) : tabType === TabType.Home ? (
				<Home pageSelected={activeTabId === id} />
			) : tabType === TabType.Script ? (
				<Script />
			) : undefined}
		</Container>
	);
}

export default pure(Page);

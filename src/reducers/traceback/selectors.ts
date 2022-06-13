import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";
import { describeFunction, getFunctionScript } from "utils/function-util";

export const selectTracebackState = (state: RootState) => state.traceback;
export const selectTracebackCallStack = (state: RootState) => state.traceback.callStack;

export const selectTracebackByString = createSelector(
	[selectTracebackState, (_: never, searchString: string) => searchString],
	(traceback, searchString) => {
		return traceback.callStack.filter((callback) => {
			const description = describeFunction(callback);
			const creator = getFunctionScript(callback);
			return (
				description.name.find(searchString)[0] !== undefined ||
				tostring(creator).find(searchString)[0] !== undefined
			);
		});
	},
);

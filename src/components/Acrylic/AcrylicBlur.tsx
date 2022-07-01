import Roact from "@rbxts/roact";
import { Workspace } from "@rbxts/services";
import { createAcrylic } from "./create-acrylic";
import { getOffset, viewportPointToWorld } from "./utils";
import { useCallback, useEffect, useMemo, useMutable, withHooksPure } from "@rbxts/roact-hooked";

interface Props {
	distance?: number;
}

function AcrylicBlur({ distance = 0.001 }: Props) {
	const positions = useMutable({
		topLeft: Vector2.zero,
		topRight: Vector2.zero,
		bottomRight: Vector2.zero,
	});

	const model = useMemo(() => {
		const model = createAcrylic();
		model.Parent = Workspace;
		return model;
	}, []);

	useEffect(() => {
		return () => model.Destroy();
	}, []);

	const updatePositions = useCallback(
		(size: Vector2, position: Vector2) => {
			positions.current = {
				topLeft: position,
				topRight: position.add(new Vector2(size.X, 0)),
				bottomRight: position.add(size),
			};
		},
		[distance],
	);

	const render = useCallback(() => {
		const camera = Workspace.CurrentCamera?.CFrame ?? new CFrame();
		const { topLeft, topRight, bottomRight } = positions.current;

		const topLeft3D = viewportPointToWorld(topLeft, distance);
		const topRight3D = viewportPointToWorld(topRight, distance);
		const bottomRight3D = viewportPointToWorld(bottomRight, distance);

		const width = topRight3D.sub(topLeft3D).Magnitude;
		const height = topRight3D.sub(bottomRight3D).Magnitude;

		model.CFrame = CFrame.fromMatrix(
			topLeft3D.add(bottomRight3D).div(2),
			camera.XVector,
			camera.YVector,
			camera.ZVector,
		);
		model.Mesh.Scale = new Vector3(width, height, 0);
	}, [distance]);

	const onChange = useCallback((rbx: Frame) => {
		const offset = getOffset();
		const size = rbx.AbsoluteSize.sub(new Vector2(offset, offset));
		const position = rbx.AbsolutePosition.add(new Vector2(offset / 2, offset / 2));

		updatePositions(size, position);
		task.spawn(render);
	}, []);

	useEffect(() => {
		const camera = Workspace.CurrentCamera!;

		const cframeChanged = camera.GetPropertyChangedSignal("CFrame").Connect(render);
		const fovChanged = camera.GetPropertyChangedSignal("FieldOfView").Connect(render);
		const screenChanged = camera.GetPropertyChangedSignal("ViewportSize").Connect(render);

		task.spawn(render);

		return () => {
			cframeChanged.Disconnect();
			fovChanged.Disconnect();
			screenChanged.Disconnect();
		};
	}, [render]);

	return (
		<frame
			Change={{
				AbsoluteSize: onChange,
				AbsolutePosition: onChange,
			}}
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundTransparency={1}
		/>
	);
}

export default withHooksPure(AcrylicBlur);

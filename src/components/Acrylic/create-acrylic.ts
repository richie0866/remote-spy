import Make from "@rbxts/make";

type Acrylic = Part & { Mesh: SpecialMesh };

export function createAcrylic() {
	return Make("Part", {
		Name: "Body",
		Color: new Color3(0, 0, 0),
		Material: Enum.Material.Glass,
		Size: new Vector3(1, 1, 0),
		Anchored: true,
		CanCollide: false,
		Locked: true,
		CastShadow: false,
		Transparency: 0.999,
		Children: [
			Make("SpecialMesh", {
				MeshType: Enum.MeshType.Brick,
				Offset: new Vector3(0, 0, -0.000001),
			}),
		],
	}) as Acrylic;
}

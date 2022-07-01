export default function applyUDim2(v2: Vector2, udim2: UDim2) {
	return new Vector2(v2.X * udim2.X.Scale + udim2.X.Offset, v2.Y * udim2.Y.Scale + udim2.Y.Offset);
}

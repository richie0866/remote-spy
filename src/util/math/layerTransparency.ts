export default function layerTransparency(n: number, ...args: number[]): number {
	return args.reduce((a, b) => 1 - (1 - a) * (1 - b), n);
}

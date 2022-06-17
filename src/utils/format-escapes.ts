export function formatEscapes(str: string): string {
	return str.gsub("[\n\r\t]+", " ")[0];
}

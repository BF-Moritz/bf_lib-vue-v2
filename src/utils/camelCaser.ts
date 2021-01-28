export default function camelCaser(input: string): string {
	return input.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

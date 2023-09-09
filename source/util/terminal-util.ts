export function activateAlternateScreen() {
	process.stdout.write('\x1b[?1049h');
}

export function deactivateAlternateScreen() {
	process.stdout.write('\x1b[?1049l');
}

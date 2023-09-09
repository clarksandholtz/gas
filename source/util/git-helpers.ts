import GitExec from './GitExec.js';

export type GitStatus = '?' | 'A' | 'M' | 'D' | 'R' | 'C' | 'U';

export type FileStatus = {
	file: string;
	indexStatus: GitStatus | null;
	treeStatus: GitStatus | null;
};

function parseGitStatus(line: string): FileStatus {
	const indexChar = line.substring(0, 1);
	const indexStatus = indexChar === ' ' ? null : (indexChar as GitStatus);
	const treeChar = line.substring(1, 2);
	const treeStatus = treeChar === ' ' ? null : (treeChar as GitStatus);
	const file = line.substring(3).trim();

	return {indexStatus, treeStatus, file};
}

export function getAllChanges(): FileStatus[] {
	try {
		const stdout = GitExec.status();
		return stdout
			.split('\n')
			.filter(line => line.trim().length > 0)
			.map(parseGitStatus);
	} catch (e) {
		return [];
	}
}

export function getStatusForFile(file: string): FileStatus | null {
	try {
		const stdout = GitExec.fileStatus(file);
		return parseGitStatus(stdout);
	} catch (e) {
		return null;
	}
}

export function stageFile(file: string): FileStatus | null {
	try {
		GitExec.add(file);
		const stdout = GitExec.fileStatus(file);
		return parseGitStatus(stdout);
	} catch (e) {
		return null;
	}
}

export function unstageFile(file: string): FileStatus | null {
	try {
		GitExec.restore(file);
		const stdout = GitExec.fileStatus(file);
		return parseGitStatus(stdout);
	} catch (e) {
		return null;
	}
}

export function commitChanges(message: string) {
	const escapedMessage = message.replace(/(?<!\\)"/g, '\\"');
	GitExec.commit(escapedMessage);
}

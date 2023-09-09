import {execSync} from 'child_process';

export type GitStatus = '??' | 'A' | 'M' | 'D' | 'R' | 'C' | 'U';

export type FileStatus = {
	file: string;
	status: GitStatus;
};

function parseGitStatus(line: string): FileStatus {
	const status = line.substring(0, 2) as GitStatus;
	const file = line.substring(3).trim();

	return {status, file};
}

export function getAllStatus(): FileStatus[] {
	try {
		const stdout = execSync('git status --porcelain').toString();
		return stdout.trim().split('\n').map(parseGitStatus);
	} catch (e) {
		return [];
	}
}

export function getStatusForFile(file: string): FileStatus | null {
	try {
		const stdout = execSync(`git status ${file} --porcelain`).toString();
		return parseGitStatus(stdout);
	} catch (e) {
		return null;
	}
}

function toggleFileStatus(file: string) {
	const{status} = getStatusForFile(file)
	if (status == '')
}

function addFile(file: string) {
		execSync(`git add ${file}`);
}

function unstageFile(file: string) {
	execSync(`git restore --staged ${file}`);
}

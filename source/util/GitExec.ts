import {execSync} from 'child_process';

export default class GitExec {
	static status(): string {
		return execSync('git status --porcelain').toString();
	}

	static fileStatus(file: string): string {
		return execSync(`git status ${file} --porcelain`).toString();
	}

	static add(file: string): string {
		return execSync(`git add ${file}`).toString();
	}

	static restore(file: string): string {
		return execSync(`git restore --staged ${file}`).toString();
	}
}

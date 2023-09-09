import {useState, useEffect} from 'react';
import {FileStatus} from '../util/git-helpers.js';

export type GroupedChanges = {
	staged: FileStatus[];
	unstaged: FileStatus[];
	totalCount: number;
};

// Custom Hook
export default function groupChanges(changes: FileStatus[]): GroupedChanges {
	const [staged, setStaged] = useState<FileStatus[]>([]);
	const [unstaged, setUnstaged] = useState<FileStatus[]>([]);

	useEffect(() => {
		const newStaged: FileStatus[] = [];
		const newUnstaged: FileStatus[] = [];

		changes.forEach(change => {
			const {indexStatus, treeStatus} = change;
			if (indexStatus !== '?' && indexStatus != null) {
				newStaged.push(change);
			}

			if (treeStatus != null) {
				newUnstaged.push(change);
			}
		});

		setStaged(newStaged);
		setUnstaged(newUnstaged);
	}, [changes]);

	return {staged, unstaged, totalCount: staged.length + unstaged.length};
}

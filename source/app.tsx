import React, {useCallback, useEffect, useState} from 'react';
import ChangeList from './components/ChangeList.js';
import {
	FileStatus,
	stageFile,
	getAllChanges,
	unstageFile,
} from './util/git-helpers.js';
import {Box, useApp, useInput} from 'ink';
import Legend from './components/Legend.js';

export default function App() {
	const [changes, setChanges] = useState<FileStatus[]>([]);
	const {exit} = useApp();
	useEffect(() => {
		setChanges(getAllChanges());
	}, []);

	const onStageFile = useCallback(
		(file: string) => {
			const updatedStatus = stageFile(file);
			if (updatedStatus != null) {
				setChanges(prevState =>
					prevState.map(value => (value.file === file ? updatedStatus : value)),
				);
			}
		},
		[setChanges],
	);

	const onUnstageFile = useCallback(
		(file: string) => {
			const updatedStatus = unstageFile(file);
			if (updatedStatus != null) {
				setChanges(prevState =>
					prevState.map(value => (value.file === file ? updatedStatus : value)),
				);
			}
		},
		[setChanges],
	);

	useInput((input, _key) => {
		if (input === 'q') {
			exit();
		}
		if (input === 'r') {
			setChanges(getAllChanges());
		}
	});

	return (
		<Box flexDirection="column">
			<ChangeList
				changes={changes}
				onStageFile={onStageFile}
				onUnstageFile={onUnstageFile}
			/>
			<Legend />
		</Box>
	);
}

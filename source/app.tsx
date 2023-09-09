import React, {useCallback, useEffect, useState} from 'react';
import ChangeList from './components/ChangeList.js';
import {
	FileStatus,
	stageFile,
	getAllChanges,
	unstageFile,
	commitChanges,
} from './util/git-helpers.js';
import {Box, useApp, useInput} from 'ink';
import Legend from './components/Legend.js';
import CommitScreen from './components/CommitScreen.js';
import {AppMode} from './types/AppMode.js';
import {clearOutput} from './util/terminal-util.js';

export default function App() {
	const [changes, setChanges] = useState<FileStatus[]>([]);
	const [commitMessage, setCommitMessage] = useState('');
	const [mode, setMode] = useState<AppMode>('change_list');
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

	const onCommit = useCallback(() => {
		commitChanges(commitMessage);
		exit();
	}, [commitMessage]);

	useInput((input, _key) => {
		if (mode === 'commit') {
			return;
		}

		if (input === 'q') {
			exit();
		}
		if (input === 'r') {
			setChanges(getAllChanges());
		}
		if (input === 'c') {
			clearOutput();
			setMode('commit');
		}
	});

	return (
		<Box flexDirection="column">
			{mode == 'change_list' && (
				<ChangeList
					changes={changes}
					onStageFile={onStageFile}
					onUnstageFile={onUnstageFile}
				/>
			)}
			{mode == 'commit' && (
				<CommitScreen
					message={commitMessage}
					updateMessage={setCommitMessage}
					onCommit={onCommit}
					onCancel={() => {
						clearOutput();
						setMode('change_list');
					}}
				/>
			)}
			<Legend mode={mode} />
		</Box>
	);
}

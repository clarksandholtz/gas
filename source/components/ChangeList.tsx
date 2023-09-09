import React, {useEffect, useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import {FileStatus} from '../util/git-helpers.js';
import StatusLine from './StatusLine.js';
import groupChanges from '../hooks/groupChanges.js';

type Props = {
	changes: FileStatus[];
	onStageFile: (file: string) => void;
	onUnstageFile: (file: string) => void;
};

export default function ChangeList({
	changes,
	onStageFile,
	onUnstageFile,
}: Props) {
	const {staged, unstaged, totalCount} = groupChanges(changes);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const unstagedStartIndex = staged.length;

	useEffect(() => {
		if (selectedIndex >= totalCount) {
			setSelectedIndex(Math.max(totalCount - 1, 0));
		}
	}, [totalCount, setSelectedIndex]);

	useInput((input, key) => {
		if (key.upArrow) {
			setSelectedIndex(prevState =>
				prevState === 0 ? totalCount - 1 : prevState - 1,
			);
		}

		if (key.downArrow) {
			setSelectedIndex(prevState => (prevState + 1) % totalCount);
		}

		if (input === ' ' || key.return) {
			if (selectedIndex < staged.length) {
				const selectedFile = staged[selectedIndex]?.file;
				if (selectedFile != null) {
					onUnstageFile(selectedFile);
				}
			} else {
				const selectedFile = unstaged[selectedIndex - unstagedStartIndex]?.file;
				if (selectedFile != null) {
					onStageFile(selectedFile);
				}
			}
		}
	});

	return (
		<Box flexDirection="column">
			<Text bold>Staged changes:</Text>
			{staged.length > 0 ? (
				staged.map((status, index) => (
					<StatusLine
						key={status.file}
						file={status.file}
						status={status.indexStatus!!}
						selected={index == selectedIndex}
					/>
				))
			) : (
				<Text>No staged changes</Text>
			)}
			<Newline />
			<Text bold>Unstaged changes:</Text>
			{unstaged.length > 0 ? (
				unstaged.map((status, index) => {
					const modifiedIndex = index + unstagedStartIndex;
					return (
						<StatusLine
							key={status.file}
							file={status.file}
							status={status.treeStatus!!}
							selected={modifiedIndex == selectedIndex}
						/>
					);
				})
			) : (
				<Text>No unstaged changes</Text>
			)}
		</Box>
	);
}

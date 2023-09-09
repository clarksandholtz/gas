import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import {FileStatus} from '../git-helpers.js';
import StatusLine from './StatusLine.js';

type Props = {
	statuses: FileStatus[];
};

export default function StatusList({statuses}: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	useInput((_input, key) => {
		if (key.upArrow) {
			setSelectedIndex(prevState =>
				prevState === 0 ? statuses.length - 1 : prevState - 1,
			);
		}

		if (key.downArrow) {
			setSelectedIndex(prevState => (prevState + 1) % statuses.length);
		}
	});
	return (
		<Box flexDirection="column">
			<Text bold>All changes:</Text>
			{statuses.length > 0 ? (
				statuses.map((status, index) => (
					<StatusLine
						key={index}
						{...status}
						selected={index == selectedIndex}
					/>
				))
			) : (
				<Text>No changes detected.</Text>
			)}
		</Box>
	);
}

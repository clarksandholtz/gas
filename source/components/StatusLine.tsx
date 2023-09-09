import React from 'react';
import {Text, Box} from 'ink';

import {GitStatus} from '../util/git-helpers.js';

const colorMap: Record<GitStatus, string> = {
	'?': 'cyan',
	A: 'green',
	M: 'yellow',
	D: 'red',
	R: 'blue',
	C: 'magenta',
	U: 'white',
};

type Props = {
	status: GitStatus;
	file: string;
	selected: boolean;
};

export default function StatusLine({status, file, selected}: Props) {
	return (
		<Box>
			<Text bold inverse={selected} color={colorMap[status]}>
				{status}
			</Text>
			<Text> {file}</Text>
		</Box>
	);
}

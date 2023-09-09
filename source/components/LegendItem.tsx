import React from 'react';
import {Box, Text} from 'ink';

type Props = {
	hotkeys: string[];
	action: string;
};

export default function LegendItem({hotkeys, action}: Props) {
	return (
		<Box flexDirection="row" gap={1}>
			<Text bold inverse color="white">
				{hotkeys.join('/')}
			</Text>
			<Text color="white">{action}</Text>
		</Box>
	);
}

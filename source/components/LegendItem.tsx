import React from 'react';
import {Box, Text} from 'ink';

export type LegendItemConfig = {
	hotkeys: string[];
	action: string;
};

export default function LegendItem({hotkeys, action}: LegendItemConfig) {
	return (
		<Box flexDirection="row" gap={1}>
			<Text bold inverse color="white">
				{hotkeys.map(value => ` ${value} `).join('/')}
			</Text>
			<Text color="white">{action}</Text>
		</Box>
	);
}

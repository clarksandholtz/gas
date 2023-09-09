import React from 'react';
import {Box} from 'ink';
import LegendItem from './LegendItem.js';

export default function Legend() {
	return (
		<Box
			flexDirection="row"
			borderStyle="single"
			borderTop={true}
			borderRight={false}
			borderLeft={false}
			borderBottom={false}
			padding={0}
			columnGap={4}
		>
			<LegendItem hotkeys={[' ␣ ', ' ↵ ']} action="stage/unstage" />
			<LegendItem hotkeys={[' r ']} action="refresh (external changes)" />
			<LegendItem hotkeys={[' q ']} action="quit" />
		</Box>
	);
}

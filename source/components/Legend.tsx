import React from 'react';
import {Box} from 'ink';
import LegendItem, {LegendItemConfig} from './LegendItem.js';
import {AppMode} from '../types/AppMode.js';

const HotkeysModeMap: Record<AppMode, LegendItemConfig[]> = {
	change_list: [
		{hotkeys: ['␣', '↵'], action: 'stage/unstage'},
		{hotkeys: ['c'], action: 'commit'},
		{hotkeys: ['r'], action: 'refresh'},
		{hotkeys: ['q'], action: 'quit'},
	],
	commit: [
		{hotkeys: ['esc'], action: 'cancel'},
		{hotkeys: ['^↵'], action: 'submit'},
	],
};

type Props = {
	mode: AppMode;
};

export default function Legend({mode}: Props) {
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
			{HotkeysModeMap[mode].map(config => (
				<LegendItem key={config.action} {...config} />
			))}
		</Box>
	);
}

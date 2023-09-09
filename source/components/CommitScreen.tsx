import {Text, useInput} from 'ink';
import React from 'react';

type Props = {
	message: string;
	updateMessage: (updater: (message: string) => string) => void;
	onCommit: () => void;
	onCancel: () => void;
};

export default function CommitScreen({
	message,
	updateMessage,
	onCommit,
	onCancel,
}: Props) {
	useInput((input, key) => {
		if (key.escape) {
			onCancel();
			return;
		}

		if (key.return) {
			if (key.ctrl) {
				onCommit();
			} else {
				updateMessage(prevState => prevState.concat('\n'));
			}
			return;
		}

		if (key.backspace || key.delete) {
			updateMessage(prevState => prevState.slice(0, -1));
			return;
		}

		updateMessage(prevState => prevState.concat(input));
	});
	return message.length > 0 ? (
		<Text>{message}</Text>
	) : (
		<Text dimColor>Enter commit message...</Text>
	);
}

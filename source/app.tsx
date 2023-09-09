import React, {useEffect, useState} from 'react';
import StatusList from './components/StatusList.js';
import {FileStatus, getAllStatus} from './git-helpers.js';

export default function App() {
	const [statuses, setStatuses] = useState<FileStatus[]>([]);
	useEffect(() => {
		setStatuses(getAllStatus());
	}, []);
	return <StatusList statuses={statuses} />;
}

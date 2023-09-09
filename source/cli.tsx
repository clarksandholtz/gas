#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import App from './app.js';
import {
	activateAlternateScreen,
	deactivateAlternateScreen,
} from './util/terminal-util.js';

activateAlternateScreen();

const {waitUntilExit} = render(<App />);

await waitUntilExit();

deactivateAlternateScreen();

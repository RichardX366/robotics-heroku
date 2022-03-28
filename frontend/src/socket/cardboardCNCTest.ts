import { createState } from '@hookstate/core';
import { socket } from '.';

export const globalLoading = createState(false);
socket.on('loading', (v) => globalLoading.set(v));

export const globalInitialized = createState(false);
socket.on('initialized', (v) => globalInitialized.set(v));

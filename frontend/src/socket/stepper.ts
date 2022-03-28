import { createState } from '@hookstate/core';
import { socket } from '.';

export const globalStepperLoading = createState(false);
socket.on('stepperLoading', (v) => globalStepperLoading.set(v));

export const globalPins = createState('');
socket.on('pins', (v) => globalPins.set(v));

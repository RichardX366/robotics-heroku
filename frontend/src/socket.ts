import { createState } from '@hookstate/core';
import { io } from 'socket.io-client';

export const socket = io();
socket.on('connect', () => {
  socket.emit('init', {});
});

export const globalConfiguration = createState('');
socket.on('configuration', (v) => globalConfiguration.set(v));

export const globalStepperLoading = createState(false);
socket.on('stepperLoading', (v) => globalStepperLoading.set(v));

export const globalPins = createState('');
socket.on('pins', (v) => globalPins.set(v));

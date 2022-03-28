import { createState } from '@hookstate/core';
import { io } from 'socket.io-client';
import { error } from '../components/Notification';

export const socket = io();
socket.on('connect', () => {
  socket.emit('init', {});
});

socket.on('error', error);

export const globalConfiguration = createState('');
socket.on('configuration', (v) => globalConfiguration.set(v));

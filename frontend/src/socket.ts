import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();
const hookMap: { [key: string]: (v: any) => void } = {};

socket.on('test', (v) => hookMap?.test(v));

export const useTest = () => {
  const [state, setState] = useState('');
  hookMap.test = setState;
  return state;
};

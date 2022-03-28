import { Socket } from 'socket.io';
import { io } from '..';
import { Clients } from '../handleSocket';

let loading = false;
let initialized = false;
let currentTask = '';

const setLoading = (v: boolean) => {
  loading = v;
  io.to('users').emit('loading', v);
};

export const userCardboardCNCTest = (socket: Socket) => {
  socket.emit('loading', loading);
  socket.emit('initialized', initialized);
  socket.on('step', (steps) => {
    if (loading) throw 'CNC is doing something';
    try {
      steps = parseInt(steps);
      if (!isFinite(steps)) throw `Invalid data: ${steps}`;
      setLoading(true);
      io.to('pi').emit('step', steps);
    } catch (e) {
      console.trace(e);
    }
  });
  socket.on('move', (position) => {
    if (loading) throw 'CNC is doing something';
    if (!initialized) throw 'CNC has not been initialized yet';
    try {
      position = +position;
      if (!isFinite(position) || position < 0)
        throw `Invalid data: ${position}`;
      setLoading(true);
      io.to('pi').emit('move', position);
    } catch (e) {
      console.trace(e);
    }
  });
  socket.on('setClosest', () => {
    if (loading) throw 'CNC is doing something';
    if (initialized) throw 'Already initialized';
    try {
      setLoading(true);
      io.to('pi').emit('setClosest');
    } catch (e) {
      console.trace(e);
    }
  });
  socket.on('setFarthest', () => {
    if (loading) throw 'CNC is doing something';
    if (initialized) throw 'Already initialized';
    try {
      currentTask = 'setFarthest';
      setLoading(true);
      io.to('pi').emit('setFarthest');
    } catch (e) {
      console.trace(e);
    }
  });
};

export const userCardboardCNCTestUnSubscribe = (clients: Clients) => {
  loading = false;
  initialized = false;
  currentTask = '';
  Object.values(clients).forEach((socket) => {
    socket.removeAllListeners('step');
    socket.removeAllListeners('move');
    socket.removeAllListeners('setClosest');
    socket.removeAllListeners('setFarthest');
    socket.removeAllListeners('loading');
  });
};

export const piCardboardCNCTest = (socket: Socket) => {
  socket.on('done', () => {
    if (currentTask === 'setFarthest') {
      initialized = true;
      io.to('users').emit('initialized', true);
    }
    setLoading(false);
  });
  socket.on('error', (error) => {
    io.to('users').emit('error', error);
    setLoading(false);
  });
};

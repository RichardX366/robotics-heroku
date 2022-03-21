import { Socket } from 'socket.io';
import { io } from '..';
import { Clients } from '../handleSocket';

let stepperLoading = false;
let pins = '5342';

const setStepperLoading = (v: boolean) => {
  stepperLoading = v;
  io.to('users').emit('stepperLoading', v);
};

const setPins = (v: string) => {
  pins = v;
  io.to('pi').emit('pins', v);
  io.to('users').emit('pins', v);
};

export const userStepper = (socket: Socket) => {
  socket.emit('stepperLoading', stepperLoading);
  socket.emit('pins', pins);
  socket.on('step', (steps) => {
    try {
      steps = parseInt(steps);
      if (!isFinite(steps)) throw `Invalid data: ${steps}`;
      io.to('users').emit('stepperLoading', true);
      io.to('pi').emit('step', steps.toString());
    } catch (e) {
      console.error(e);
    }
  });
  socket.on('pins', (pins) => {
    try {
      pins = parseInt(pins);
      if (!isFinite(pins) || pins < 2000 || pins > 9876)
        throw `Invalid data: ${pins}`;
      setStepperLoading(true);
      setPins(pins.toString());
    } catch (e) {
      console.error(e);
    }
  });
};

export const userStepperUnSubscribe = (clients: Clients) => {
  Object.values(clients).forEach((socket) => {
    socket.removeAllListeners('step');
  });
};

export const piStepper = (socket: Socket) => {
  socket.on('done', () => setStepperLoading(false));
};

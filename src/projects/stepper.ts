import { Socket } from 'socket.io';
import { io } from '..';
import { Clients } from '../handleSocket';

export const userStepper = (socket: Socket) => {
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
};

export const userStepperUnSubscribe = (clients: Clients) => {
  Object.values(clients).forEach((socket) => {
    socket.removeAllListeners('step');
  });
};

export const piStepper = (socket: Socket) => {
  socket.on('stepped', () => {
    io.to('users').emit('stepperLoading', false);
  });
};

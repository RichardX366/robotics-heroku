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
      if (stepperLoading) throw 'Stepper is doing something';
      steps = parseInt(steps);
      if (!isFinite(steps)) throw `Invalid data: ${steps}`;
      io.to('users').emit('stepperLoading', true);
      io.to('pi').emit('step', steps.toString());
    } catch (e) {
      console.trace(e);
    }
  });
  socket.on('pins', (pinsString: string) => {
    try {
      if (stepperLoading) throw 'Stepper is doing something';
      const pinsNum = parseInt(pinsString);
      if (!isFinite(pinsNum) && pinsNum.toString().length === 4)
        throw `Invalid data: ${pinsString}`;
      setStepperLoading(true);
      setPins(pinsString);
    } catch (e) {
      console.trace(e);
    }
  });
};

export const userStepperUnSubscribe = (clients: Clients) => {
  stepperLoading = false;
  pins = '5342';
  Object.values(clients).forEach((socket) => {
    socket.removeAllListeners('step');
    socket.removeAllListeners('stepperLoading');
  });
};

export const piStepper = (socket: Socket) => {
  socket.on('done', () => setStepperLoading(false));
};

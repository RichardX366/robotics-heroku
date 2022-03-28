import { Server, Socket } from 'socket.io';
import {
  piCardboardCNCTest,
  userCardboardCNCTest,
  userCardboardCNCTestUnSubscribe,
} from './projects/cardboardCNCTest';
import {
  piStepper,
  userStepper,
  userStepperUnSubscribe,
} from './projects/stepper';

type Configuration = '' | 'stepper' | 'cardboardCNCTest';
export type Clients = { [key: string]: Socket };

let configuration: Configuration = '';
const clients: Clients = {};

export default function handleSocket(io: Server) {
  io.on('connection', (socket) => {
    const changeConfiguration = (config: Configuration) => {
      switch (configuration) {
        case 'stepper':
          userStepperUnSubscribe(clients);
          break;
        case 'cardboardCNCTest':
          userCardboardCNCTestUnSubscribe(clients);
          break;
      }
      configuration = config;
      io.to('users').emit('configuration', configuration);
      switch (configuration) {
        case 'stepper':
          Object.values(clients).forEach(userStepper);
          break;
        case 'cardboardCNCTest':
          Object.values(clients).forEach(userCardboardCNCTest);
          break;
      }
    };

    socket.on('init', (data) => {
      if (process.env.SECRET === data.secret) {
        socket.join('pi');
        changeConfiguration(data.configuration);
        switch (configuration) {
          case 'stepper':
            piStepper(socket);
            break;
          case 'cardboardCNCTest':
            piCardboardCNCTest(socket);
            break;
        }
        socket.on('disconnect', () => {
          changeConfiguration('');
        });
      } else {
        clients[socket.id] = socket;
        socket.join('users');
        socket.emit('configuration', configuration);
        switch (configuration) {
          case 'stepper':
            userStepper(socket);
            break;
          case 'cardboardCNCTest':
            userCardboardCNCTest(socket);
            break;
        }
        socket.on('disconnect', () => delete clients[socket.id]);
      }
    });
  });
}

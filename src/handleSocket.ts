import { Server, Socket } from 'socket.io';
import {
  piStepper,
  userStepper,
  userStepperUnSubscribe,
} from './projects/stepper';

type Configuration = '' | 'stepper';
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
      }
      configuration = config;
      io.to('users').emit('configuration', configuration);
      switch (configuration) {
        case 'stepper':
          Object.values(clients).forEach(userStepper);
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
        }
        socket.on('disconnect', () => delete clients[socket.id]);
      }
    });
  });
}

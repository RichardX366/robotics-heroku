import { Server } from 'socket.io';

export default function handleSocket(io: Server) {
  io.on('connection', (socket) => {
    setTimeout(() => socket.emit('test', 'feck'), 1000);
  });
}

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handleSocket from './handleSocket';
const app = express();
const server = createServer(app);
const io = new Server(server);

let base = __dirname.split('/');
base.pop();
const path = base.join('/');

app.use(express.json());
app.use(express.static(`${path}/frontend/build`));

app.get('*', (_, res) => res.sendFile(`${path}/frontend/build/index.html`));

handleSocket(io);

server.listen(process.env.PORT || 80, () =>
  console.log('App is now initialized and ready for requests.'),
);

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handleSocket from './handleSocket';
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(`${__dirname}/frontend/build`));

app.get('*', (_, res) =>
  res.sendFile(`${__dirname}/frontend/build/index.html`),
);

handleSocket(io);

server.listen(process.env.PORT || 80, () =>
  console.log('App is now initialized and ready for requests.'),
);

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { initializeChat } from './chatGPT.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');
  initializeChat(socket);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running`);
});

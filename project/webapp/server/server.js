const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('chat message', (message) => {
		io.emit('chat message', message);
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

server.listen(3001, () => {
	console.log('WebSocket server listening on port 3001');
});

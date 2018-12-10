const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//app.set('views', publicPath);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessagge', message);


        io.emit('newMessage',generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', (socket) => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log('Express server listening on port ', port);
});
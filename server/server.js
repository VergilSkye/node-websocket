const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const socketIO = require('socket.io');

const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//app.set('views', publicPath);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(favicon(path.join(__dirname,'../public','images','favicon.ico')));

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from:'Jon',
        text:'See you then.',
        createdAt:456
    });

    socket.on('createMessage', (message)=>{
        console.log('createMessagge',message);        
    }); 
    
    socket.on('disconnect', (socket) => {
        console.log('User was disconnected');            
    });
});

server.listen(port, () => {
    console.log('Express server listening on port ',port); 
});

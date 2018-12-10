var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', (socket) => {
    console.log('Disconnected from server');            
});

socket.on('newMessage', (message)=>{
    console.log('newMessage',message);    
});

var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup, thats work for me'
    });
});

socket.on('disconnect', (socket) => {
    console.log('Disconnected from server');            
});

socket.on('newMessage', (message)=>{
    console.log('newMessage',message);    
});
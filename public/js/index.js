var socket = io();


socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', (socket) => {
    console.log('Disconnected from server');            
});

socket.on('newMessage', (message)=>{
    console.log('newMessage',message);
    const li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li)
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    socket.emit('createMessage',{
        from: 'User:',
        text: jQuery('[name=message]').val()
    }, function() {
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function (){
    if(!navigator.geolocation){
        return alert('GeoLocation not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
});

var socket = io();

function scrollToBotton () {
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');
    // Heinghts
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();


    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);       
    }
}

socket.on('connect', () => {    
    const params = jQuery.deparam(window.location.search);
    socket.emit('join',params, function (err) {
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else{
            console.log('No error');
            
        }
    });
});

socket.on('disconnect', (socket) => {
    console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);


    
});

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createAt:formattedTime
    });

    jQuery('#messages').append(html); 
    scrollToBotton();       
});

socket.on('newLocationMessage', function (message) {    
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createAt:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBotton();      

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();    

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {});
    jQuery('[name=message').val('');
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('GeoLocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.attr('disabled', 'disabled').text('Sending location');
        alert('Unable to fetch location');
    });
});
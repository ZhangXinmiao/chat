var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user join this chat room👏');
    socket.on('disconnect', function(socket) {
        console.log('a user exit this chat room😳');
    });
    socket.on('chat message', function(msg) {
        console.log('a user send some message! context:' + msg);
        io.emit('chat message', msg);
    });
})

http.listen(3002, function() {
    console.log('listening on port 3002 😆');
})

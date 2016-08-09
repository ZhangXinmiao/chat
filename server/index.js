var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var users = 0;


//创建io通道链接
io.on('connection', function(socket) {
    users++;
    console.log('a user join us! 👏 there is ' + users + 'users online');
    socket.emit('connection', users);
    socket.on('disconnect', function(socket) {
        users--;
        console.log('a user leave, 😳 there is ' + users + 'users online');
        console.log('=====================================================');
        io.emit('disconnect', users);
    });
    socket.on('danmu message', function(msg, color, top, fontSize) {
        console.log('a user send some message! context:' + msg);
        function getRandomColor() {
            var c = '#';
            var cArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
            for(var i = 0; i < 6;i++)
            {
                var cIndex = Math.round(Math.random()*15);
                c += cArray[cIndex];
            }
            return c;
        }
        var color = getRandomColor();
        var top = Math.floor(300 * Math.random());
        var fontSize = Math.floor(60 * Math.random());
        io.emit('danmu message', msg, color, top, fontSize);
    });
})

http.listen(3002, function() {
    console.log('listening on port 3002 😆');
    console.log('=====================================================');
});

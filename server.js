var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors')

app.use(cors());

io.on('connection', function(socket){
        socket.on('joinRoom', function(room) {
        socket.join(room);
        io.sockets.in(room).emit('roomUsers', io.sockets.adapter.rooms[room].length);
    }) 
    
    socket.on('disconnect', function(socket){ 
        io.sockets.emit('userExit', 'userExitted');
    })

    socket.on('getRoomUsers', function(room) {
        io.sockets.in(room).emit('roomUsers', io.sockets.adapter.rooms[room].length);
    })

    socket.on('update', function(room) {
        io.sockets.in(room).emit('update', 'update time');
    })
});

http.listen(8080, function(){
});
    
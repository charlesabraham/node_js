var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*
io.on('connection',function(socket){

	console.log('user connected');

	 socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });

	  socket.on('chat message', function(msg){
	    console.log('message: ' + msg);
	  });

});
*/



var count = 0;


io.on('connection', function(socket){


io.emit('system message', 'user connected');

count++;

socket.on('disconnect', function(){
	    io.emit('system message', 'user disconnected');
	    count--;
	    io.emit('counter', 'users : ' + count);
	  });



io.emit('counter', 'users : ' + count);


socket.on('chat message', function(msg){
   // console.log('message: ' + msg);

io.emit('chat message', msg);

  });




});


http.listen(3000, function(){
  console.log('listening on localhost:3000');
});

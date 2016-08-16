var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var path    = require('path');
//var a;



////////////////////////////

var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

/////////////////////////////

app.use(express.static(path.join(__dirname,"test")));

var port = process.env.PORT || 8358;
http.listen(port, function(){
  console.log("server on!: http://localhost:8358/");
});

///////////////////////////////

io.on('connection', function(socket){


socket.on('user', function(data){
   console.log('123');
 io.emit('user','data');

  });


//////////////////////// port 6001 /////////////////
socket.on('message', function(data){
          console.log(data);
          io.emit('message',data);

    //a = data;
//return a;

var server1= dgram.createSocket('udp4');
var message = new Buffer(data);
    
server1.send(message, 0, message.length, 6001, "127.0.0.1", function(err, bytes) {
      server1.close();
           });

          });

/////////////////////////////////////////////



socket.on('20', function(str){
   console.log(str);
 io.emit('20',str);

});




socket.on('21', function(str){
   console.log(str);
 io.emit('21',str);

});


console.log('user connected: ', "abc");

socket.on('disconnect', function(){
   console.log('user disconnected: ', "bye");
  });








 
});





////////////////////////

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);

});



server.on('message', function (st) 
{

var message = st.toString();
 
console.log('' + message);

  io.emit('20',message);


  server.send(message, 0, message.length, 6000, "127.0.0.1", function(err, bytes) 
  {
    console.log( "" + message);
  });
       


});




//server.on('message', function () 
//{

 //console.log( "" + a);
       
  //server.send(a, 0, a.length, 6001, "127.0.0.1");
   

//});







////////////////

server.bind(port, HOST);


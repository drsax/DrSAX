var express = require('express');
var app     = express();
var https    = require('https');
var path    = require('path');
var  fs = require('fs');


var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('server.crt')
};



var server = https.createServer(options, app).listen(443, function(){
  console.log("server on!: https://localhost");
});

var io      = require('socket.io').listen(server);




app.use(express.static(path.join(__dirname,"test")));





//////////////////////////////////////////

var objects = {};
var count=1;

io.on('connection', function(socket){
 
  var name = count++;

  console.log('user connected: ',name);
 io.emit('change name',name);


socket.on('1', function(str){
   console.log(str);
 io.emit('1',str);
});

socket.on('2', function(str){
   console.log(str);
 io.emit('2',str);
});
socket.on('3', function(str){
   console.log(str);
 io.emit('3',str);
});
socket.on('4', function(str){
   console.log(str);
 io.emit('4',str);
});
socket.on('5', function(str){
   console.log(str);
 io.emit('5',str);
});
socket.on('6', function(str){
   console.log(str);
 io.emit('6',str);
});
socket.on('7', function(str){
   console.log(str);
 io.emit('7',str);
});
socket.on('8', function(str){
   console.log(str);
 io.emit('8',str);
});
socket.on('9', function(str){
   console.log(str);
 io.emit('9',str);
});
socket.on('10', function(str){
   console.log(str);
 io.emit('10',str);
});


socket.on('11', function(str){
   console.log(str);
 io.emit('11',str);
});
socket.on('12', function(str){
   console.log(str);
 io.emit('12',str);
});
socket.on('13', function(str){
   console.log(str);
 io.emit('13',str);
});
socket.on('14', function(str){
   console.log(str);
 io.emit('14',str);
});
socket.on('15', function(str){
   console.log(str);
 io.emit('15',str);
});
socket.on('16', function(str){
   console.log(str);
 io.emit('16',str);
});
socket.on('17', function(str){
   console.log(str);
 io.emit('17',str);
});
socket.on('18', function(str){
   console.log(str);
 io.emit('18',str);
});
socket.on('19', function(str){
   console.log(str);
 io.emit('19',str);
});
socket.on('20', function(str){
   console.log(str);
 io.emit('20',str);
});

socket.on('21', function(str){
   console.log(str);
 io.emit('21',str);
});
socket.on('22', function(str){
   console.log(str);
 io.emit('22',str);
});
socket.on('23', function(str){
   console.log(str);
 io.emit('23',str);
});
socket.on('24', function(str){
   console.log(str);
 io.emit('24',str);
});
socket.on('25', function(str){
   console.log(str);
 io.emit('25',str);
});
socket.on('26', function(str){
   console.log(str);
 io.emit('26',str);
});
socket.on('27', function(str){
   console.log(str);
 io.emit('27',str);
});
socket.on('28', function(str){
   console.log(str);
 io.emit('28',str);
});
socket.on('29', function(str){
   console.log(str);
 io.emit('29',str);
});
socket.on('30', function(str){
   console.log(str);
 io.emit('30',str);
});
socket.on('31', function(str){
   console.log(str);
 io.emit('31',str);
});



socket.on('user', function(data){
   console.log('12345');
 io.emit('user','data');
 });

socket.on('star', function(data){
   console.log('125');
 io.emit('star','data');

  });





 io.emit('id',socket.id);

  socket.on('disconnect', function(){
  var minus = count--;
    delete objects[socket.id];
    console.log('user disconnected',minus);
    io.emit('change name',minus-2);


  });


 
});


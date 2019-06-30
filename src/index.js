var app = require('express')();
var http = require('http').createServer(app);
var io = module.exports.io = require('socket.io')(http);
var socketManager = require('./socketManager')

app.get('/', function (req, res) {
	res.send('Hello world');
});

io.on('connection', socketManager);

http.listen(process.env.PORT || 4000, function () {
	console.log('listening on *:4000', process.env.PORT);
})

setInterval(() => io.emit('time', new Date().toTimeString()), 2000);
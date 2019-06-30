var app = require('express')();
var http = require('http').createServer(app);
var io = module.exports.io = require('socket.io')(http);
var socketManager = require('./socketManager')

app.get('/', function (req, res) {
	res.send('Hello world');
});

io.on('connection', socketManager);

const PORT = process.env.PORT || 4000;
http.listen(PORT, function () {
	console.log('listening on *:' + PORT, process.env.PORT);
})

setInterval(() => io.emit('time', new Date().toTimeString()), 2000);
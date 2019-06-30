var Sequelize = require('sequelize');
var Message = require('./models/messages');
var io = require('./index').io;
var {USER_VERIFY, USER_CONNECTED, USER_DISCONNECTED, MESSAGE_SEND, MESSAGE_HISTORY} = require('./events');
var iconv = require('iconv-lite');

var connectedUsers = [];

module.exports = function (socket) {
	console.log('Socket Id:' + socket.id);

	//Verify UserName
	socket.on(USER_VERIFY, (nickname, callback) => {
		if (isUser(connectedUsers, nickname)) {
			callback({ isUser: true, user: null})
		} else {
			callback({ isUser: false, user: nickname});
		}
	});

	socket.on(MESSAGE_SEND , ({user, text}) => {
		saveMessages(user, text, 1);
	});

	//User Connects with username
	socket.on(USER_CONNECTED, ({user, historyLimit}) => {
		connectedUsers = addUser(connectedUsers, user);
		socket.user = user;
		socket.lastMessageId = Number.MAX_SAFE_INTEGER;
		io.emit(USER_CONNECTED, {user, connectedUsers});
		getHistory(historyLimit);
	});

	//Get History
	socket.on(MESSAGE_HISTORY, (historyLimit) => {
		getHistory(historyLimit);
	});

	//User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user);
			io.emit(USER_DISCONNECTED, {user: socket.user, connectedUsers});
			//console.log("Disconnect", connectedUsers);
		}
	});

	function addUser(userList, user) {
		return [...userList, user];
	}

	function removeUser(userList, user) {
			return userList.filter(name => name !== user);
	}

	function isUser(userList, user) {
		  return userList.indexOf(user) >= 0;
	}

	function saveMessages(user, text, type) {
		user = iconv.encode(iconv.decode(user, "cp1251"), "utf8").toString();
		var message = iconv.encode(iconv.decode(text, "cp1251"), "utf8").toString();
		console.log({user, message});
		Message.create({ user, message, dt: Date.now()}).then(
			(result) => io.emit(MESSAGE_SEND, result)
		);
	}

	function getHistory(limit) {
		var id = socket.lastMessageId;
		Message.findAll(
			{
				where: {
					id: {[Sequelize.Op.lt]: id}
				},
				order: [['id', 'desc']],
				limit
			}).then(
			(result) => {
				socket.lastMessageId = result.length > 0 ? result[result.length - 1].id : socket.lastMessageId;
				socket.emit(MESSAGE_HISTORY, result.reverse());
			}
		)
	}

};
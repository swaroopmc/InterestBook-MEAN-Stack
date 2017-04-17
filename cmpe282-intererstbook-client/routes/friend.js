/**
 * New node file
 */
var amqp = require('amqplib/callback_api');
function generateUuid() {
	return Math.random().toString() + Math.random().toString()
			+ Math.random().toString();
}
exports.friend = function(req, res) {
	res.render('friend', {
		title : "Friend",
		firstname : req.session.firstname,
		lastname : req.session.lastname
	});
};
exports.searchFriend = function(req, res) {
	var friendName = req.param("friendName");
	amqp.connect('amqp://test:test@52.39.243.204', function(err, conn) {
		conn.createChannel(function(err, ch) {
			ch.assertQueue('', {
				exclusive : true
			}, function(err, q) {
				var corr = generateUuid();
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
						var message = JSON.parse(msg.content.toString());
						console.log(message.value);
						res.send(message.value);
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("searchFriend", new Buffer(friendName), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});
}
exports.sendRequest = function(req, res) {
	var friendUsername = req.param("username");
	var friendName = req.param("friendName");
	var request_info = {
		"username" : req.session.username,
		"name" : req.session.firstname + " " + req.session.lastname,
		"friendUsername" : friendUsername,
		"friendName" : friendName
	};
	amqp.connect('amqp://172.31.23.241', function(err, conn) {
		conn.createChannel(function(err, ch) {
			ch.assertQueue('', {
				exclusive : true
			}, function(err, q) {
				var corr = generateUuid();
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
						var message = JSON.parse(msg.content.toString());
						console.log(message.value);
						res.send(message);
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("friendRequest", new Buffer(JSON
						.stringify(request_info)), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});
}
exports.getFriend = function(req, res) {
	amqp.connect('amqp://test:test@52.39.243.204', function(err, conn) {
		conn.createChannel(function(err, ch) {
			ch.assertQueue('', {
				exclusive : true
			}, function(err, q) {
				var corr = generateUuid();
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
						var message = JSON.parse(msg.content.toString());
						console.log(message.value.friendList);
						res.send(message);
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("friend", new Buffer(req.session.username), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});
};
exports.addFriend = function(req, res) {
	var friendUsername = req.param("friendUsername");
	var friendName = req.param("friendName");
	var obj = {
		"username" : req.session.username,
		"friendUsername" : friendUsername,
		"friendName" : friendName
	}
	amqp.connect('amqp://test:test@52.39.243.204', function(err, conn) {
		conn.createChannel(function(err, ch) {
			ch.assertQueue('', {
				exclusive : true
			}, function(err, q) {
				var corr = generateUuid();
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
						var message = JSON.parse(msg.content.toString());
						console.log(message);
						res.send(message);
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("addFriend", new Buffer(JSON.stringify(obj)), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});
};
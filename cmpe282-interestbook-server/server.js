var amqp = require('amqplib/callback_api');
var amqp = require('amqplib/callback_api');
var login = require('./services/login');
var news = require('./services/news');
var signup = require('./services/signup');
var userInfo = require('./services/userInfo');
var interest = require('./services/interest');
var about = require('./services/about');
var searchFriend = require('./services/searchFriend');
var friendRequest = require('./services/friendRequest');
var friend = require('./services/friend');
var addFriend = require('./services/addFriend');
var homepage = require('./services/homepage');
amqp.connect('amqp://test:test@52.39.243.204', function(err, conn) {
	conn.createChannel(function(err, ch) {
		ch.assertQueue("login", {
			durable : false
		});
		ch.prefetch(1);
		console.log('login channel');

		ch.consume("login", function reply(msg) {
			login.handle_request(JSON.parse(msg.content.toString()), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});

	conn.createChannel(function(err, ch) {
		ch.assertQueue("signup", {
			durable : false
		});
		ch.prefetch(1);
		console.log('signup channel');

		ch.consume("signup", function reply(msg) {
			signup.handle_request(JSON.parse(msg.content.toString()), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});

	conn.createChannel(function(err, ch) {
		ch.assertQueue("userInfo", {
			durable : false
		});
		ch.prefetch(1);
		console.log('userInfo channel');

		ch.consume("userInfo", function reply(msg) {
			userInfo.handle_request(JSON.parse(msg.content.toString()), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	
	conn.createChannel(function(err, ch) {
		ch.assertQueue("homepage", {
			durable : false
		});
		ch.prefetch(1);
		console.log('homepage channel');

		ch.consume("homepage", function reply(msg) {
			homepage.handle_request(msg.content.toString(), function(err, res) {
				console.log("! "+res);
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	
	conn.createChannel(function(err, ch) {
		ch.assertQueue("news", {
			durable : false
		});
		ch.prefetch(1);
		console.log('news channel');

		ch.consume("news", function reply(msg) {
			news.handle_request(JSON.parse(msg.content.toString()), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	
	conn.createChannel(function(err, ch) {
		ch.assertQueue("interest", {
			durable : false
		});
		ch.prefetch(1);
		console.log('interest channel');

		ch.consume("interest", function reply(msg) {
			interest.handle_request(JSON.parse(msg.content.toString()), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	
	conn.createChannel(function(err, ch) {
		ch.assertQueue("about", {
			durable : false
		});
		ch.prefetch(1);
		console.log('about channel');

		ch.consume("about", function reply(msg) {
			console.log(msg.content.toString())
			about.handle_request(msg.content.toString(), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	
	conn.createChannel(function(err, ch) {
		ch.assertQueue("searchFriend", {
			durable : false
		});
		ch.prefetch(1);
		console.log('searchFriend channel');

		ch.consume("searchFriend", function reply(msg) {
			console.log(msg.content.toString())
			searchFriend.handle_request(msg.content.toString(), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	conn.createChannel(function(err, ch) {
		ch.assertQueue("friendRequest", {
			durable : false
		});
		ch.prefetch(1);
		console.log('friendRequest channel');

		ch.consume("friendRequest", function reply(msg) {
			console.log(msg.content.toString())
			friendRequest.handle_request(JSON.parse(msg.content.toString()), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	
	conn.createChannel(function(err, ch) {
		ch.assertQueue("friend", {
			durable : false
		});
		ch.prefetch(1);
		console.log('friend channel');

		ch.consume("friend", function reply(msg) {
			console.log(msg.content.toString())
			friend.handle_request(msg.content.toString(), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});
	conn.createChannel(function(err, ch) {
		ch.assertQueue("addFriend", {
			durable : false
		});
		ch.prefetch(1);
		console.log('addFriend channel');

		ch.consume("addFriend", function reply(msg) {
			console.log(msg.content.toString())
			addFriend.handle_request(JSON.parse(msg.content.toString()), function(err, res) {
				ch.sendToQueue(msg.properties.replyTo, new Buffer(res), {
					correlationId : msg.properties.correlationId
				});
			});

			ch.ack(msg);
		});
	});

});
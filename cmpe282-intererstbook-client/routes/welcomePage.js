/**
 * New node file
 */
var amqp = require('amqplib/callback_api');
var crypto = require('crypto'), algorithm = 'aes-256-ctr', pass = 'd6F3Efeq';
function generateUuid() {
	return Math.random().toString() + Math.random().toString()
			+ Math.random().toString();
}
var reg_username;
exports.login = function(req, res) {
	var username = req.param("username");
	var password = req.param("password");
	var cipher = crypto.createCipher(algorithm, pass);
	var crypted_login = cipher.update(password, 'utf8', 'hex');
	crypted_login += cipher.final('hex');
	var login_info = {
		"username" : username,
		"password" : crypted_login
	};
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
						if (message.code == "200") {
							req.session.username = message.value.username;
							req.session.firstname = message.value.firstname;
							req.session.lastname = message.value.lastname;
						}
						res.send(message);
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("login", new Buffer(JSON.stringify(login_info)),
						{
							correlationId : corr,
							replyTo : q.queue
						});
			});
		});
	});
};
exports.signup = function(req, res) {
	reg_username = req.param("username");
	var reg_password = req.param("password");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var cipher = crypto.createCipher(algorithm, pass);
	var crypted_singup = cipher.update(reg_password, 'utf8', 'hex');
	crypted_singup += cipher.final('hex');
	var signup_info = {
		"username" : reg_username,
		"password" : crypted_singup,
		"firstname" : firstname,
		"lastname" : lastname
	};
	amqp.connect('amqp://test:test@52.39.243.204', function(err, conn) {
		conn.createChannel(function(err, ch) {
			ch.assertQueue('', {
				exclusive : true
			}, function(err, q) {
				var corr = generateUuid();
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
						console.log(msg.content.toString());
						res.send(JSON.parse(msg.content.toString()));
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("signup",
						new Buffer(JSON.stringify(signup_info)), {
							correlationId : corr,
							replyTo : q.queue
						});
			});
		});
	});

};
exports.userInfo = function(req, res) {
	res.render("userInfo");
};
exports.getUserInfo = function(req, res) {
	var overview = req.param("overview");
	var work = req.param("work");
	var education = req.param("education");
	var email = req.param("email");
	var user_info = {
		"username" : reg_username,
		"overview" : overview,
		"work" : work,
		"education" : education,
		"email" : email
	};
	amqp.connect('amqp://test:test@52.39.243.204', function(err, conn) {
		conn.createChannel(function(err, ch) {
			ch.assertQueue('', {
				exclusive : true
			}, function(err, q) {
				var corr = generateUuid();
				ch.consume(q.queue, function(msg) {
					if (msg.properties.correlationId == corr) {
						console.log(msg.content.toString());
						res.send(JSON.parse(msg.content.toString()));
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("userInfo",
						new Buffer(JSON.stringify(user_info)), {
							correlationId : corr,
							replyTo : q.queue
						});
			});
		});
	});
};
exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};
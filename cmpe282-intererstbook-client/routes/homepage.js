/**
 * New node file
 */
var amqp = require('amqplib/callback_api');
function generateUuid() {
	return Math.random().toString() + Math.random().toString()
			+ Math.random().toString();
}
exports.homepage = function(req, res) {
	res.render("homepage", {
		title : "Home Page",
		firstname : req.session.firstname,
		lastname : req.session.lastname
	});
};
exports.addNews = function(req, res) {
	var news = req.param("news");
	console.log("news = " + news);
	var news_info = {
		"username" : req.session.username,
		"news" : news,
		"firstname" : req.session.firstname,
		"lastname" : req.session.lastname
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
						res.send(message);
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("news", new Buffer(JSON.stringify(news_info)), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});

};
exports.getHomepage = function(req, res) {
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
				ch.sendToQueue("homepage", new Buffer(req.session.username), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});

};
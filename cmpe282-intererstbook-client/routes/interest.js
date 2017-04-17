/**
 * New node file
 */
var amqp = require('amqplib/callback_api');
function generateUuid() {
	return Math.random().toString() + Math.random().toString()
			+ Math.random().toString();
}
exports.interest = function(req, res) {
	res.render('interest', {
		title : "Interest Page",
		firstname : req.session.firstname,
		lastname : req.session.lastname,
		username : req.session.username
	});
};

exports.getInterest = function(req, res) {
	var interestAry = req.param('interestAry');
	console.log(interestAry);
	var interest_info = {
		"username" : req.session.username,
		"interest" : interestAry,
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
				ch.sendToQueue("interest", new Buffer(JSON
						.stringify(interest_info)), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});
}
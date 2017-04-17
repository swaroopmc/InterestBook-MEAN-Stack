/**
 * New node file
 */
var amqp = require('amqplib/callback_api');
function generateUuid() {
	return Math.random().toString() + Math.random().toString()
			+ Math.random().toString();
}
exports.about = function(req, res) {
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
						if (req.session.username == message.value.username) {
							res.render('about', {
								title : "About",
								firstname : req.session.firstname,
								lastname : req.session.lastname,
								overview : message.value.overview,
								work : message.value.work,
								education : message.value.education,
								email : message.value.email
							});

						}
						setTimeout(function() {
							conn.close();
						}, 500);
					}
				}, {
					noAck : true
				});
				ch.sendToQueue("about", new Buffer(req.session.username), {
					correlationId : corr,
					replyTo : q.queue
				});
			});
		});
	});

}
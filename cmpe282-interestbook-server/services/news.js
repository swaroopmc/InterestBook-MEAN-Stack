/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/interestbook";
function handle_request(msg, callback) {
	var res = {};
	mongo.connect(mongoURL, function() {
		var coll = mongo.collection('news');
		console.log(msg);
		coll.insertOne({
			username : msg.username,
			news : msg.news,
			firstname : req.session.firstname,
			lastname : req.session.lastname
		}, function(err, user) {
			if (err) {
				console.log("Server news Failed");
				res.code = "400";
				res.value = "Failed news";
			} else {
				console.log("Server news Success");
				res.code = "200";
				res.value = "Succes news";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
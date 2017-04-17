/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://172.31.23.241:27017/interestbook";
function handle_request(msg, callback) {
	var res = {};
	mongo.connect(mongoURL, function() {
		var coll = mongo.collection('interest');
		console.log(msg);
		coll.insertOne({
			username : msg.username,
			interest : msg.interest,
			firstname : msg.firstname,
			lastname : msg.lastname
		}, function(err, user) {
			if (err) {
				console.log("Server interest Failed");
				res.code = "400";
				res.value = "Failed interest";
			} else {
				console.log("Server interest Success");
				res.code = "200";
				res.value = "Succes interest";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
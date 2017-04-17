/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://172.31.23.241:27017/interestbook";
function handle_request(msg, callback) {
	var res = {};
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
		console.log(msg.username);
		coll.insertOne({
			username : msg.username,
			password : msg.password,
			firstname : msg.firstname,
			lastname : msg.lastname,
		}, function(err, user) {
			if (err) {
				console.log("Server signup Failed");
				res.code = "400";
				res.value = "Failed signup";
			} else {
				console.log("Server signup Success");
				res.code = "200";
				res.value = "Succes Signup";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
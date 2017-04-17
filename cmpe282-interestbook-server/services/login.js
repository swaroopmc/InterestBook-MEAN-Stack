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
		console.log(msg);
		coll.findOne({
			username : msg.username,
			password : msg.password
		}, function(err, user) {
			if (user) {
				console.log("Server Login Success");
				res.code = "200";
				res.value = {
					"username" : user.username,
					"firstname" : user.firstname,
					"lastname" : user.lastname,
				};
			} else {
				console.log("Server Login Failed");
				res.code = "400";
				res.value = "User not found";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
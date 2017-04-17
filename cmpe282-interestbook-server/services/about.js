/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://172.31.23.241:27017/interestbook";
function handle_request(msg, callback) {
	var res = {};
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userInfo');
		console.log("This is about "+msg);
		coll.findOne({
			username : msg,
		}, function(err, user) {
			if (user) {
				console.log("Server is Success");
				res.code = "200";
				res.value = {
					"username" : user.username,
					"overview" : user.overview,
					"work" : user.work,
					"education" : user.education,
					"email" : user.email
				};
			} else {
				console.log("Server about Failed");
				res.code = "400";
				res.value = "User Information not found";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
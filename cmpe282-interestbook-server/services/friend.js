/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://172.31.23.241:27017/interestbook";
function handle_request(msg, callback) {
	var res = {};
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('friend');
		console.log("This is friend " + msg);
		coll.findOne({
			username : msg,
		}, function(err, user) {
			if (user) {				
				console.log("Server friend Success");
				console.log(user.friendList);
				console.log(user.requestList);
				res.code = "200";
				res.value = {
					"username" : user.username,
					"friendList" : user.friendList,
					"requestList" : user.requestList
				};
			} else {
				console.log("Server friend Failed");
				res.code = "400";
				res.value = "User Information not found";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
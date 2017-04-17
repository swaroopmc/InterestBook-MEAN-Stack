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
		console.log("searchFriend " + msg);
		coll.find({
			$or : [ {
				firstname : msg
			}, {
				lastname : msg
			} ]
		}).toArray( function(err, user) {
			console.log(user);
			if (user) {
				console.log("Server searchFriend Success");
				res.code = "200";
				res.value = user;
			} else {
				console.log("Server searchFriend Failed");
				res.code = "400";
				res.value = "Failed searchFriend";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
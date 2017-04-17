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
		console.log(msg);
		coll.findOne({
			username : msg.friendUsername
		}, function(err, result) {
			if (result == null) {
				console.log("User Friend collection has not been set up");
				coll.insertOne({
					username : msg.friendUsername,
					requestList : [],
					friendList : []
				}, function(err, user) {
				});
			}
			obj = {
				"name" : msg.name,
				"username" : msg.username
			};
			coll.update({
				username : msg.friendUsername,
			}, {
				$push : {
					requestList : obj
				}
			}, function(err, user) {
				if (err) {
					console.log("Server friendRequest Failed");
					res.code = "400";
					res.value = "Failed friendRequest";
				} else {
					console.log("Server friendRequest Success");
					res.code = "200";
					res.value = "Succes friendRequest";
				}
				res = JSON.stringify(res);
				callback(null, res);
			});

		})

	});
}
exports.handle_request = handle_request;
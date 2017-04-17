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
		console.log("1 " + msg);
		coll.findOne({
			username : msg.username
		}, function(err, result) {
			console.log("2");
			if (result == null) {
				console.log("User Friend collection has not set up");
				coll.insertOne({
					username : msg.username,
					requestList : [],
					friendList : []
				}, function(err, user) {
					console.log("3");
				});
			}
			obj = {
				"friendUsername" : msg.friendUsername,
				"friendName" : msg.friendName
			}
			coll.update({
				username : msg.username,
			}, {
				$push : {
					friendList : obj
				},
				$pull : {
					requestList : {
						"name" : msg.friendName,
						"username" : msg.friendUsername
					}
				}
			}, function(err, user) {
				console.log("4");
				if (err) {
					console.log("Server addFriend Failed");
					res.code = "400";
					res.value = "Failed addFriend";
				} else {
					console.log("Server addFriend Success");
					res.code = "200";
					res.value = "Succes addFriend";
				}
				console.log("9");
				res = JSON.stringify(res);
				callback(null, res);
				console.log("10");
			});
		});

	});
}

exports.handle_request = handle_request;
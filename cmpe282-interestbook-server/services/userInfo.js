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
		console.log(msg);
		coll.insertOne({
			username : msg.username,
			overview : msg.overview,
			work : msg.work,
			education : msg.education,
			email : msg.email,
		}, function(err, user) {
			if (err) {
				console.log("Server userInfo Failed");
				res.code = "400";
				res.value = "Failed userInfo";
			} else {
				console.log("Server userInfo Success");
				res.code = "200";
				res.value = "Succes userInfo";
			}
			res = JSON.stringify(res);
			callback(null, res);
		});
	});
}
exports.handle_request = handle_request;
/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://172.31.23.241:27017/interestbook";
var interestList = [];
var newsList = [];
function handle_request(msg, callback) {
	var res = {};
	console.log("11");
	mongo.connect(mongoURL, function() {
		console.log("22");
		var coll = mongo.collection('interest');
		coll.find().toArray(
				function(err, interest) {
					if (interest) {
						console.log("Server homepage Success");
						console.log(interest);
						for (var i = 0; i < interest.length; i++) {
							var obj1 = {
								"name" : interest[i].firstname + " "
										+ interest[i].lastname,
								"interest" : interest[i].interest
							}
							interestList.push(obj1);
						}
						res.code = "200";
					} else {
						console.log("Server homepage Failed");
						res.code = "400";
					}
					mongo.collection('news').find().toArray(
							function(err, news) {
								console.log(news);
								if (news.length > 0) {
									for (var j = 0; j < news.length; j++) {
										var obj2 = {
											"name" : news[j].firstname + " "
													+ news[j].lastname,
											"news" : news[j].news
										}
										newsList.push(obj2);
									}
								}
								res.value = {
									"interest" : interestList,
									"news" : newsList
								};
								res = JSON.stringify(res);
								callback(null, res);
								interestList = [];
								newsList = [];
							});

				});
	});
}
exports.handle_request = handle_request;
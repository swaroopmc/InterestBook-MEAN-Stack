var express = require('express')
  , routes = require('./routes')
  , welcomePage = require('./routes/welcomePage')
  , homepage = require('./routes/homepage')
  , interest = require('./routes/interest')
  , about = require('./routes/about')
  , friend = require('./routes/friend')
  , http = require('http')
  , path = require('path');
var mongoSessionConnectURL = "mongodb://172.31.23.241:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

var app = express();

// all environments
app.set('port', process.env.PORT || 5555);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'Interestbook_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/userInfo',welcomePage.userInfo);
app.get('/homepage',homepage.homepage);
app.get('/interest',interest.interest);
app.get('/about',about.about);
app.get('/friend',friend.friend);

app.post('/login',welcomePage.login);
app.post('/logout',welcomePage.logout);
app.post('/signup',welcomePage.signup);
app.post('/userInfo',welcomePage.getUserInfo);
app.post('/addNews',homepage.addNews);
app.post('/homepage',homepage.getHomepage);
app.post('/interest',interest.getInterest);
app.post('/friend',friend.getFriend);
app.post('/searchFriend',friend.searchFriend);
app.post('/sendRequest',friend.sendRequest);
app.post('/addFriend',friend.addFriend);



mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});

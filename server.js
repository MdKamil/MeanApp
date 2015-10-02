var express 		= require('express'),
	http			= require('http'),
	path 			= require('path'),
	bodyParser		= require('body-parser'),
	methodOverride 	= require('method-override'),
	cookieParser	= require('cookie-parser'),
	jwt        		= require("jsonwebtoken"),
	expressSession	= require('express-session'),
	app				= express(),
	passport		= require('passport'),
	mongoose		= require('mongoose');

mongoose.connect('mongodb://localhost:27017/justPost');
app.set('port', process.env.PORT || 7500);
app.use(express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
require('./server/config/passport.js')(passport);
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false	
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(expressSession({ 
	secret: 'keyboard cat',
	resave: false,
 	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/authConfiguration.js')(app,passport);
require('./server/routes/resourceAPI.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
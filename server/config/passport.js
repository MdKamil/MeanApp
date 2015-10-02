var LocalStrategy  	= require('passport-local').Strategy,
	SignUp  = require('../models/signUp_db');

module.exports = function (passport){
	console.log("passport is gonna validate...");
	passport.use(new LocalStrategy(function (username,password,done){
			SignUp.findOne({ useremail: username},function (err,user){
				if(err){
					console.log("Error while authenticating the user...")
					return done(err);
				} else if(!user){
					console.log("Invalid credentials...");
					return done(null, false);
				} else if(user){
					var hash = user.password;
					user.comparePassword(password,hash,function (err,valid){
						if(err){
							return done(err);
						}else if(!valid){
							console.log("Not a valid one");
							return done(null,false);
						}else if(valid){
							console.log("Valid credentials");
							return done(null,user);
						}
					});
				}
			});
	}));
};
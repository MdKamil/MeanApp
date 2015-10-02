var mongoose 			= require('mongoose'),
	Schema	 			= mongoose.Schema,
	bcrypt 				= require('bcrypt'),
    SALT_WORK_FACTOR 	= 10;

var signUpSchema = new Schema({
	username   : { type: String, required: true },
	password   : { type: String, required: true },
	useremail  : { type: String, required: true },
	dateJoined : { type: Date, default: Date.now, required: true },
	token	   : String
});

signUpSchema.pre('save', function(next) {
    var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) {
		return next();
	}
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) return next(err);
	    // hash the password using our new salt
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        if (err) return next(err);
	        // override the cleartext password with the hashed one
	        user.password = hash;
	        next();
	    });
	});
});

signUpSchema.methods.comparePassword = function(candidatePassword,hash,cb) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	console.log(candidatePassword);
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('SignUp',signUpSchema);
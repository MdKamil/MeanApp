var mongoose = require('mongoose'),
	Schema	 = mongoose.Schema;
	User	 = require('./signUp_db');

var postsSchema = new Schema({
	postTitle   	: { type: String, required: true },
	post 			: { type: String, required: true },
	postAuthor  	: { type: String, ref: User, required: true },
	posted_date  	: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Posts',postsSchema);
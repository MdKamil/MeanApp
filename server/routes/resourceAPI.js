var Posts   = require('../models/post_db'),
	SignUp  = require('../models/signUp_db');

module.exports = function (app) {
	
	app.get('/api/posts',ensureAuthenticated,function (req,res){
		SignUp.findOne({token : req.token},function (err,result){
			if(err){
				res.json({
	                type: false,
	                data: "Error occured while retrieving al posts: " + err
            	});
			}else if(result){
				Posts.find({useremail:req.user},function (err, results){
					if(err){
						console.log("Error while fetching documents...");
						console.log("Error is :",err);
					}else if(results){
						console.log("All data is fetched..");
						res.json(results);	
					}
				});
			}
		});
	});

	app.get('/api/posts/:postId',ensureAuthenticated,function (req,res){
		SignUp.findOne({token : req.token},function (err,result){
			if(err){
				res.json({
	                type: false,
	                data: "Error occured: " + err
            	});
			}else if(result){
				Posts.findOne({_id:req.params.postId},function (err,result){
					if (err){
						console.log("Error while fetching data by ID...");
					}else if(result){
						console.log("Data is retrieved...");
						res.json(result);
					}
				});
			}
		});	
	});

	app.post('/api/posts',ensureAuthenticated,function (req,res){
		SignUp.findOne({token : req.token},function (err,result){
			if(err){
				res.json({
	                type: false,
	                data: "Error occured: " + err
            	});
			}else if(result){
				var newPost = new Posts(req.body);
				newPost.save(function (err,result){
					if (err){
						console.log("Error while creating a new post")
					}else if(result){
						console.log("Successfully created a new post");
						res.json(result);
					}
				});
			}
		});
	});

	app.put('/api/posts/:postId',ensureAuthenticated,function (req,res){
		console.log(req.body.postTitle);
		SignUp.findOne({token : req.token},function (err,result){
			if(err){
				res.json({
	                type: false,
	                data: "Error occured: " + err
            	});
			} else if(result){
				Posts.update({_id:req.params.postId},{$set:{postTitle:req.body.postTitle,
					post:req.body.post}},function (err,result){
					if (err){
						console.log("Error while updating a post");
					}else if(result){
						console.log("Successfully updated a post");
						res.json(result);
					}
				});
			}
		});
	});

	app.delete('/api/posts/:postId',ensureAuthenticated,function (req,res){
		SignUp.findOne({token : req.token},function (err,result){
			if(err){
				res.json({
	                type: false,
	                data: "Error occured: " + err
            	});
			}else if(result){
				Posts.remove({_id:req.params.postId},function (err,result){
					if (err){
						console.log("Error while deleting the post");
					}else if(result){
						console.log("Successfully deleted a post");
						res.json(result);
					}
				});
			}
		});
	});

	function ensureAuthenticated (req,res,next){
		var bearerToken;
    	var bearerHeader = req.headers["authorization"];
	    if (typeof bearerHeader !== 'undefined') {
	        var bearer = bearerHeader.split(" ");
	        bearerToken = bearer[1];
	        req.token = bearerToken;
	        req.user = req.headers.user;
	        next();
	    } else {
	        res.send(403);
	    }
	}
}
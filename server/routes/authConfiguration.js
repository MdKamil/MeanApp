var path    = require('path'),
    SignUp  = require('../models/signUp_db'),
    jwt     = require("jsonwebtoken");

module.exports = function(app,passport){

    app.post('/login',passport.authenticate('local',{ session: false }),function (req,res){
        console.log("Authentication done");
        console.log(req.user.username);
        res.status(200).send({type: true,email: req.user.useremail,name: req.user.username,
            token: req.user.token});
    });

    app.post('/signUp',function (req,res){
        var checkEmail = req.body.useremail;
        console.log(checkEmail);
        SignUp.findOne({useremail:checkEmail},function (err,found){
            if(err){
                console.log("Error occured while checking for Email");
                res.status(500).send("Error occured...");
            }else if(!found){
                console.log(res);
                console.log("No such email address found");
                var createUser = new SignUp(req.body);
                createUser.save(function (err,user){
                    if (err){
                        console.log("Error while creating new user...");
                    }else if(user){
                        console.log("New user created");
                        createUser.token = jwt.sign(user,'shhhhh its a secret');
                        createUser.save(function (err,result){
                            console.log("DONE");
                            res.status(201).send({type: true, email: result.useremail, name: result.username,
                                token:result.token});
                        });
                    }
                });
            }else if(found){
                console.log("Some other user have the same email ID");
                res.status(409).send("Someone already has that emailAddress.Try another")
            }
        });
    });

    app.get('/home',function (req,res){
        console.log("If this url is hit then the user is authenticated....");
        res.sendFile(path.join(__dirname, '../../client/', 'home.html'),function(err){
            if (err) {
                if (err.code === "ECONNABORT" && res.statusCode == 304) {
                    // No problem, 304 means client cache hit, so no data sent.
                    console.log('304 cache hit for home.html' );
                    return;
                }
                console.error("SendFile error:", err, " (status: " + err.status + ")");
                if (err.status) {
                    res.status(err.status).end();
                }
            } else {
                console.log('Sent: home.html');
            }
        });
    });

    app.get('/logout',function (req,res){
        req.logout;
        res.redirect('/');
    });
}
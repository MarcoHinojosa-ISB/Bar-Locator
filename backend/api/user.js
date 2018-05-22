var bcrypt = require("bcrypt");

var User = require("../models/user.js");

function init(app){
  app.post("/api/users/register", function(req, res){
    console.log("before");

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if(err)
        res.status(500).send("server error");
      else{
        var newUser = new User({
          username: req.body.username,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        })

        newUser.save(function(err){
          if(err){
            res.status(500).send(err)
          }else{
            res.status(200).send("ok");
          }
        });
      }
    });
  })

  app.post("/api/users/check-duplicate-usernames", function(req, res){
    User.find({ username: req.body.username }).exec(function(err, duplicates){
      if(err)
        res.status(500).send("server error");
      else if(duplicates.length > 0)
        res.status(500).send("username already exists");
      else
        res.status(200).send("ok");
    });
  })

  app.post("/api/users/login", function(req, res){
    User.find({ username: req.body.username }).exec(function(err, user){
      if(err)
        res.status(500).send("server error");
      else if(user.length === 0)
        res.status(500).send("username does not exist");
      else{
        bcrypt.compare(req.body.password, user[0].password, function(err, isPasswordMatch){
          if(err)
            res.status(500).send("Server error");
          else if(!isPasswordMatch)
            res.status(500).send("password is invalid");
          else
            res.status(200).send("ok");
        })
      }
    })
  })
}

module.exports = init;

var User = require("../models/user.js");
var bcrypt = require("bcryptjs");
var joi = require("joi");

var userSchema = joi.object().keys({
    firstName: joi.string().alphanum().min(3).max(16).required(),
    lastName: joi.string().alphanum().min(3).max(16).required(),
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,20}$/)
});

function register(data, callback){
  //joi validation
  var validation = joi.validate(data, userSchema);

  if(validation.error){
    callback(validation.error.details[0].message, null);
  }
  else{
    //check existing usernames
    checkExistingUsernames(data, function(err){
      if(err)
        callback(err, null);
      else{
        bcrypt.hash(data.password, 10, function(err, hash) {
          if(err)
            callback("server error2", null);
          else{
            var newUser = new User({
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              password: hash
            })

            newUser.save(function(err){
              err ? callback("server error3", null) : callback(null, data);
            });
          }
        });
      }
    })
  }
}

function checkExistingUsernames(data, callback){
  User.find({ username: data.username }).exec(function(err, result){
    if(err)
      callback("server error1");
    else if(result.length > 0)
      callback('"username" already exists');
    else
      callback(null);
  });
}

function login(data, callback){
  User.find({ username: data.username }).exec(function(err, user){
    if(err)
      callback("server error", null);
    else if(user.length === 0)
      callback("username does not exist", null);
    else{
      bcrypt.compare(data.password, user[0].password, function(err, isPasswordMatch){
        if(err)
          callback("Server error", null);
        else if(!isPasswordMatch)
          callback("password is invalid", null);
        else{
          callback(null, data);
        }
      })
    }
  })
}

module.exports = {
  register: register,
  login: login
}

var user = require("../queries/user.js");
var jwt = require("jsonwebtoken");
var jwtsecret = require("../../jwtsecret.js");

function init(app){
  app.post("/api/users/register", function(req, res){
    user.register(req.body, function(err, result){
      err ? res.status(500).send(err) : res.status(200).send(generateToken(result));
    })
  })

  app.post("/api/users/login", function(req, res){
    user.login(req.body, function(err, result){
      err ? res.status(500).send(err) : res.status(200).send(generateToken(result));
    });
  })

  // generate session token
  function generateToken(data){
    var user = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName
    }
    return jwt.sign(user, jwtsecret.secret);
  }
}

module.exports = init;

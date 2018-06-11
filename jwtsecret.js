require("dotenv").config();

var obj = {
  secret: process.env.JWT_SECRET
}

module.exports = obj

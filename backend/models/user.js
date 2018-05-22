var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	 username: {type: String, unique: true, required: true},
	 password: {type: String, required: true},
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
	 date_created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("user", userSchema);

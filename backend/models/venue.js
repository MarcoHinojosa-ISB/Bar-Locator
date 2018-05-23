var mongoose = require("mongoose");

var venueSchema = mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  address: {type: String},
  phone_number: {type: String},
  link: {type: String},
  image_url: {type: String},
  people_going: {type: [String], default: []}
})

module.exports = mongoose.model("venue", venueSchema);

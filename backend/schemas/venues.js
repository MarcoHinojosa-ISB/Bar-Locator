var mongoose = require("mongoose");

var venueSchema = mongoose.Schema({
  venueId: {type: String, required: true},
  people_going: {type: [String]}
})

module.exports = mongoose.model("venues", venueSchema);

var Venue = require("../models/venue.js");

function addNewVenues(data, callback){
  for(let i=0; i<data.length; i++){
    Venue.find({ id: data[i].id }).exec(function(err, result){
      if(err)
        callback("server error", null);
      else if(result.length === 0){
        var newVenue = new Venue({
          id: data[i].id,
          name: data[i].name,
          address: data[i].location.address1 + ", " + data[i].location.city + ", " + data[i].location.country,
          phone_number: data[i].display_phone,
          link: data[i].url,
          image_url: data[i].image_url,
          people_going: []
        });

        newVenue.save(function(err){
          if(err)
            callback(err, null);
          else if(i+1 === data.length)
            callback(null, "ok");
        });
      }
      else if(i + 1 === data.length)
        callback(null, "ok");
    })
  }
}

function retrieveVenues(data, callback){
  var ids = [];

  for(i in data){
    ids.push(data[i].id);
  }

  Venue.find( {id: { $in: ids } } ).exec(function(err, results){
    err ? callback(err, null) : callback(null, results);
  });
}

function addUserToVenue(data, callback){
  var goingList = data.people_going;
  goingList.push(data.username);

  Venue.findOneAndUpdate({ id: data.id }, {people_going: goingList}, { "new": true}, function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

function removeUserFromVenue(data, callback){
  var goingList = data.people_going.filter(function(val){
    return val !== data.username;
  });

  Venue.findOneAndUpdate({ id: data.id }, {people_going: goingList}, { "new": true}, function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

module.exports = {
  addNewVenues: addNewVenues,
  retrieveVenues: retrieveVenues,
  addUserToVenue: addUserToVenue,
  removeUserFromVenue: removeUserFromVenue
}

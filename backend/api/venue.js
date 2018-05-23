var Venue = require("../models/venue.js");

function init(app){
  // for each venue received, add to the database if not exists
  app.post("/api/venues/add-new-venues", function(req, res){
    for(let i=0; i<req.body.businesses.length; i++){
      Venue.find({ venueId: req.body.businesses[i].id }).exec(function(err, result){
        if(err)
          res.status(500).send("server error");
        else if(result.length === 0){
          var newVenue = new Venue({
            venueId: req.body.businesses[i].id,
            name: req.body.businesses[i].name,
            address: req.body.businesses[i].location.address1 + ", " + req.body.businesses[i].location.city + ", " + req.body.businesses[i].location.country,
            phone_number: req.body.businesses[i].display_phone,
            link: req.body.businesses[i].url,
            image_url: req.body.businesses[i].image_url,
            people_going: []
          });

          newVenue.save(function(err){
            if(err)
              res.status(500).send(err);
            else if(i+1 === req.body.businesses.length)
              res.status(200).send("ok");
          });
        }
        else if(i + 1 === req.body.businesses.length)
          res.status(200).send("ok");
      })
    }
  })

  // retrieve venue data from database
  app.post("/api/venues/retrieve-venues", function(req, res){
    var ids = [];

    // if retrieving immediately after search
    if(req.body.businesses){
      for(i in req.body.businesses){
        ids.push(req.body.businesses[i].id);
      }
    }
    // if retrieving after updating people going
    else{
      for(i in req.body){
        ids.push(req.body[i].venueId);
      }
    }

    Venue.find( {venueId: { $in: ids } } ).exec(function(err, results){
      err ? res.status(500).send(err) : res.status(200).send(results);
    });
  });

  app.post("/api/venues/add-to-venue", function(req, res){
    var goingList = req.body.people_going;
    goingList.push(req.body.username);

    Venue.findOneAndUpdate({ venueId: req.body.venueId }, {people_going: goingList}, { "new": true}, function(err, result){
      if(err)
        res.status(500).send(err);
      else
        res.status(200).send(result);
    })
  })
  app.post("/api/venues/remove-from-venue", function(req, res){
    var goingList = req.body.people_going.filter(function(val){
      return val !== req.body.username;
    });

    Venue.findOneAndUpdate({ venueId: req.body.venueId }, {people_going: goingList}, { "new": true}, function(err, result){
      if(err)
        res.status(500).send(err);
      else
        res.status(200).send(result);
    })
  })
}

module.exports = init;

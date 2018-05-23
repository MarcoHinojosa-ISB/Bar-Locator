var Venue = require("../models/venue.js");

function init(app){
  // for each venue received, add to the database if not exists
  app.post("/api/venues/add-new-venues", function(req, res){
    for(let i=0; i<req.body.length; i++){
      Venue.find({ id: req.body[i].id }).exec(function(err, result){
        if(err)
          res.status(500).send("server error");
        else if(result.length === 0){
          var newVenue = new Venue({
            id: req.body[i].id,
            name: req.body[i].name,
            address: req.body[i].location.address1 + ", " + req.body[i].location.city + ", " + req.body[i].location.country,
            phone_number: req.body[i].display_phone,
            link: req.body[i].url,
            image_url: req.body[i].image_url,
            people_going: []
          });

          newVenue.save(function(err){
            if(err)
              res.status(500).send(err);
            else if(i+1 === req.body.length)
              res.status(200).send("ok");
          });
        }
        else if(i + 1 === req.body.length)
          res.status(200).send("ok");
      })
    }
  })

  // retrieve venue data from database
  app.post("/api/venues/retrieve-venues", function(req, res){
    var ids = [];

    for(i in req.body){
      ids.push(req.body[i].id);
    }

    Venue.find( {id: { $in: ids } } ).exec(function(err, results){
      err ? res.status(500).send(err) : res.status(200).send(results);
    });
  });

  app.post("/api/venues/add-user-to-venue", function(req, res){
    var goingList = req.body.people_going;
    goingList.push(req.body.username);

    Venue.findOneAndUpdate({ id: req.body.id }, {people_going: goingList}, { "new": true}, function(err, result){
      if(err)
        res.status(500).send(err);
      else
        res.status(200).send(result);
    })
  })
  app.post("/api/venues/remove-user-from-venue", function(req, res){
    var goingList = req.body.people_going.filter(function(val){
      return val !== req.body.username;
    });

    Venue.findOneAndUpdate({ id: req.body.id }, {people_going: goingList}, { "new": true}, function(err, result){
      if(err)
        res.status(500).send(err);
      else
        res.status(200).send(result);
    })
  })
}

module.exports = init;

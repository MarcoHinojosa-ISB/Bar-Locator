var venue = require("../queries/venue.js");

function init(app){
  // for each venue received, add to the database if not exists
  app.post("/api/venues/add-new-venues", function(req, res){
    venue.addNewVenues(req.body, function(err, result){
      err ? res.status(500).send(err) : res.status(200).send(result);
    })
  })

  // retrieve venue data from database
  app.post("/api/venues/retrieve-venues", function(req, res){
    venue.retrieveVenues(req.body, function(err, result){
      err ? res.status(500).send(err) : res.status(200).send(result);
    })
  });

  app.post("/api/venues/add-user-to-venue", function(req, res){
    venue.addUserToVenue(req.body, function(err, result){
      err ? res.status(500).send(err) : res.status(200).send(result);
    })
  })
  app.post("/api/venues/remove-user-from-venue", function(req, res){
    venue.removeUserFromVenue(req.body, function(err, result){
      err ? res.status(500).send(err) : res.status(200).send(result);
    })
  })
}

module.exports = init;

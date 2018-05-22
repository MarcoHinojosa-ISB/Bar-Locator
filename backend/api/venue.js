var Venue = require("../models/venue.js");

function init(app){
  app.post("/api/venues/add-new-venues", function(req, res){
    var count = 0;
    for(let i=0; i<req.body.businesses.length; i++){
      Venue.find({ venueId: req.body.businesses[i].id }).exec(function(err, result){
        if(err){
          res.status(500).send("server error");
        }

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
            else{
              count++;
              if(count >= req.body.businesses.length)
                res.status(200).send("ok");
            }
          });
        }
        else{
          count++;
          if(count >= req.body.businesses.length)
            res.status(200).send("ok");
        }

      })
    }


  })

  app.post("/api/venues/get-people-going", function(req, res){
    var ids = [];

    for(i in req.body.businesses){
      ids.push(req.body.businesses[i].id);
    }
    console.log(ids)
    Venue.find( {venueId: { $in: ids }}).exec(function(err, results){
      if(err)
        res.status(500).send(err);
      else{
        res.status(200).send(results);
      }

    });
  })
}

module.exports = init;

// NOTE: not part of mongo database, exists for 3rd party APIs such as YELP Fusion

var axios = require("axios");
require("dotenv").config();

function init(app){
  app.get("/api/ex/search", function(req, res){
    axios.get('https://api.yelp.com/v3/businesses/search?location='+req.query.location+'&categories=amusementparks&limit=50', {
      headers: {
        'Authorization': 'Bearer ' + process.env.YELP_FUSION_API_KEY
      }
    })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
  })
}

module.exports = init;

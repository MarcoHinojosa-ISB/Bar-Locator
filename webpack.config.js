var bodyParser = require("body-parser");
var axios = require("axios");
require("dotenv").config();

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss?$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: /node_modules/
      }
    ]
  },
  entry: ["./src/entry.jsx", "./src/stylesheets/_main.scss"],
  output: {
    path: __dirname + "/src/build",
    publicPath: "src/build",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    before(app){
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));

      app.get("/search", function(req, res){
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
      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, authorization");//, multipart/form-data");
        next();
      });
    }
  }
}

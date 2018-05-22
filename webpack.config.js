var bodyParser = require("body-parser");
var mongoose = require("mongoose");
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
      mongoose.connect(process.env.MONGO_URL);

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));

      require("./backend/api/external.js")(app);
      require("./backend/api/user.js")(app);
      require("./backend/api/venue.js")(app);

      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, authorization");//, multipart/form-data");
        next();
      });
    }
  }
}

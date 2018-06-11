# Bar Locator

### a small app that allows users to search for any nearby bars in a specific area.

#### This project uses
* Node.js
* Express.js
* Reactjs
* MongoDB w/ mongoose
* Sass
* Webpack & Babel
* Axios

#### How to run (this assumes you have postgres installed)
* Clone the repository
* Install node modules with `npm install`
* Create a `.env` file
* Add `MONGODB_URI` along with mongo connect string to `.env` file
* Create a `jwtsecret.js` file in the same directory
* Module.Export an object with a "secret" property and give it a value 
* Build the client-side code with `npm run build`
* Run the app with `npm start`
* If currently using for development, run the app with `npm run dev` for live-reload

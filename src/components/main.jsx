import React from "react";
import {BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";
import Navigation from "./navigation/index.jsx";
import Home from "./home/index.jsx";

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <BrowserRouter>
        <div>
          <Route render={(props) => <Navigation {...props} />} />

          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main;

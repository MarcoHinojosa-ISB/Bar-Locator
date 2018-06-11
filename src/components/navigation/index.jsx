import React from "react";
import {withRouter} from "react-router";
import store from "../../store/index.jsx";
import {loggedOut} from "../../store/actions/userActions.jsx";
import jwt from "jsonwebtoken";
import jwtsecret from "../../../jwtsecret.js";

class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  home(){
    this.props.history.push("/");
  }
  login(){
    this.props.history.push("/login");
  }
  logout(){
    store.dispatch(loggedOut());
    this.props.history.push("/");
  }
  register(){
    this.props.history.push("/register");
  }
  render(){
    try{
      var userdata = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need for err handling yet
    }

    if(userdata){
      var btns = (
        <ul className="nav-btns">
          <li>{userdata.username}</li>
          <li className="clickable" onClick={this.logout.bind(this)}>Log out</li>
        </ul>
      )
    }
    else{
      var btns = (
        <ul className="nav-btns">
          <li className="clickable" onClick={this.login.bind(this)}>Login</li>
          <li className="clickable" onClick={this.register.bind(this)}>Register</li>
        </ul>
      )
    }

    return(
      <div id="navigation">
        <h3 className="title" onClick={this.home.bind(this)}>Bar Locator</h3>

        {btns}
      </div>
    )
  }
}

export default withRouter(Navigation);

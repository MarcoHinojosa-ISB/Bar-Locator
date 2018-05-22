import React from "react";
import {withRouter} from "react-router";
import store from "../../store/index.jsx";
import {loggedOut} from "../../store/actions/userActions.jsx";

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
    if(store.getState().user.username){
      var btns = (
        <ul className="nav-btns">
          <li>{store.getState().user.username}</li>
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
        <h3 className="title" onClick={this.home.bind(this)}>Theme Park Locator</h3>

        {btns}
      </div>
    )
  }
}

export default withRouter(Navigation);

import React from "react";
import {withRouter} from "react-router";

class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  login(){
    this.props.history.push("/login");
  }
  register(){
    this.props.history.push("/register");
  }
  render(){
    return(
      <div id="navigation">
        <h3 className="title">Theme Park Locator</h3>

        <ul className="nav-btns">
          <li onClick={this.login.bind(this)}>Login</li>
          <li onClick={this.register.bind(this)}>Register</li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Navigation);

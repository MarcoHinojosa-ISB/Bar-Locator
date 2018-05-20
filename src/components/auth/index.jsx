import React from "react";
import Login from "./login.jsx";
import Register from "./register.jsx";

class Auth extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    var title = this.props.authType === "login" ? "Sign in": "Sign up";
    var form = this.props.authType === "login" ? (<Login />): (<Register />);

    return(
        <div id="auth">
          <h3>{title}</h3>
          {form}
        </div>
    )
  }
}

export default Auth;

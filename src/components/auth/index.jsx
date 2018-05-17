import React from "react";
import Login from "./login.jsx";
import Register from "./register.jsx";

class Auth extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var form = this.props.authType === "login" ? (<Login />): (<Register />);

    return(
      <div id="auth">
        {form}
      </div>
    )

  }
}

export default Auth;

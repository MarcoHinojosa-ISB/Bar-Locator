import React from "react";

class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <div id="navigation">
        <h3 className="title">Venue Locator</h3>

        <ul className="nav-btns">
          <li>Login</li>
          <li>Register</li>
        </ul>
      </div>
    )
  }
}

export default Navigation;

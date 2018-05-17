import React from "react";

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: "", password: "", firstName: "", lastName: ""}
  }
  setFirst(e){
    this.setState({firstName: e.target.value})
  }
  setLast(e){
    this.setState({lastName: e.target.value})
  }
  setUsername(e){
    this.setState({username: e.target.value})
  }
  setPassword(e){
    this.setState({password: e.target.value})
  }

  render(){
    return(
      <div id="register">
        <form >
          <input type="text" onChange={this.setFirst.bind(this)} placeholder="first name" />
          <input type="text" onChange={this.setLast.bind(this)} placeholder="last name" />
          <input type="text" onChange={this.setUsername.bind(this)} placeholder="username" />
          <input type="password" onChange={this.setPassword.bind(this)} placeholder="password" />
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default Register;

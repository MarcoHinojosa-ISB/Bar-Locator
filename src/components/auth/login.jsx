import React from "react";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: "", password: ""}
  }
  setUsername(e){
    this.setState({username: e.target.value})
  }
  setPassword(e){
    this.setState({password: e.target.value})
  }
  login(){

  }

  render(){
    return (
      <div id="login">
        <form onSubmit={this.login.bind(this)}>
          <input type="text" onChange={this.setUsername} value={this.state.username} placeholder="username" />
          <input type="password" onChange={this.setPassword} value={this.state.password} placeholder="password" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default Login;

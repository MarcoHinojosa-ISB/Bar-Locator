import React from "react";
import {withRouter} from "react-router";
import Axios from "axios";
import store from "../../store/index.jsx";
import {loggedIn} from "../../store/actions/userActions.jsx";

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
  login(e){
    e.preventDefault();
    Axios.post("/api/users/login", this.state)
    .then( result => {
      store.dispatch(loggedIn(this.state.username, this.state.firstName, this.state.lastName));
      this.props.history.push("/");
    })
    .catch( err => {
      console.log(err);
    })
  }

  render(){
    return (
      <form id="login" onSubmit={this.login.bind(this)}>
        <input type="text" onChange={this.setUsername.bind(this)} value={this.state.username} placeholder="username" />
        <input type="password" onChange={this.setPassword.bind(this)} value={this.state.password} placeholder="password" />
        <input type="submit" value="submit" />
      </form>
    )
  }
}

export default withRouter(Login);

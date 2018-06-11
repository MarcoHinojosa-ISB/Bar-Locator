import React from "react";
import {withRouter} from "react-router";
import Axios from "axios";
import store from "../../store/index.jsx";
import {loggedIn} from "../../store/actions/userActions.jsx";
import jwt from "jsonwebtoken";
import jwtsecret from "../../../jwtsecret.js";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: "", password: "", errorMessage: ""}
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
      this.setState({errorMessage: ""})
      store.dispatch(loggedIn(result.data));
      this.props.history.push("/");
    })
    .catch( err => {
      this.setState({errorMessage: "username or passsword is incorrect"});
      console.log(err);
    })
  }
  componentWillMount(){
    try{
      var test = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle err
    }
    if(test){
      this.props.history.push("/");
    }
  }
  render(){
    return (
      <form id="login" onSubmit={this.login.bind(this)}>
        <input type="text" onChange={this.setUsername.bind(this)} value={this.state.username} placeholder="username" />
        <input type="password" onChange={this.setPassword.bind(this)} value={this.state.password} placeholder="password" />
        <div className="error">{this.state.errorMessage}</div>
        <input type="submit" value="submit" />
      </form>
    )
  }
}

export default withRouter(Login);

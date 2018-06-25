import React from "react";
import {withRouter} from "react-router";
import Axios from "axios";
import store from "../../store/index.jsx";
import {loggedIn} from '../../store/actions/userActions.jsx';
import jwt from "jsonwebtoken";
import jwtsecret from "../../../jwtsecret.js";

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: "", lastName: "", username: "", password: "",
      firstNameError: "", lastNameError: "", usernameError: "", passwordError: ""
    }
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
  register(e){
    e.preventDefault();

    this.setState({usernameError: ""});
    this.setState({passwordError: ""});
    this.setState({firstNameError: ""});
    this.setState({lastNameError: ""});

    Axios.post("/api/users/register", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    })
    .then( result => {
      store.dispatch(loggedIn(result.data));
      this.props.history.push("/")
    })
    .catch( err => {
      switch(err.response.data.split('"')[1]){
        case "firstName":
          this.setState({firstNameError: "First Name" + err.response.data.split('"')[2]});
          break;
        case "lastName":
          this.setState({lastNameError: "Last Name" + err.response.data.split('"')[2]});
          break;
        case "username":
          this.setState({usernameError: "Username" + err.response.data.split('"')[2]});
          break;
        case "password":
          this.setState({passwordError: "Password must be alphanumeric and between 6-20 characters"});
          break;
      }
    })

    return false;
  }
  componentWillMount(){
    try{
      var user = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle err for now
    }
    if(user){
      this.props.history.push("/");
    }
  }
  render(){
    return(
      <form id="register" onSubmit={this.register.bind(this)}>
        <input type="text" onChange={this.setFirst.bind(this)} placeholder="First Name" />
        <div className="error">{this.state.firstNameError}</div>
        <input type="text" onChange={this.setLast.bind(this)} placeholder="Last Name" />
        <div className="error">{this.state.lastNameError}</div>
        <input type="text" onChange={this.setUsername.bind(this)} placeholder="Username" />
        <div className="error">{this.state.usernameError}</div>
        <input type="password" onChange={this.setPassword.bind(this)} placeholder="Password" />
        <div className="error">{this.state.passwordError}</div>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}

export default withRouter(Register);

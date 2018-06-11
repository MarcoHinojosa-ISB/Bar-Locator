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
      username: "", password: "", firstName: "", lastName: "",
      usernameError: "", passwordError: "", firstNameError: "", lastNameError: ""
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
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    })
    .then( result => {
      store.dispatch(loggedIn(result.data));
      this.props.history.push("/")
    })
    .catch( err => {
      switch(err.response.data.split('"')[1]){
        case "username":
          this.setState({usernameError: err.response.data});
          break;
        case "password":
          this.setState({passwordError: err.response.data});
          break;
        case "firstname":
          this.setState({firstNameError: err.response.data});
          break;
        case "lastname":
          this.setState({lastNameError: err.response.data});
          break;
      }
    })

    return false;
  }
  componentWillMount(){
    try{
      var test = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
    }
    catch(err){
      // no need to handle err for now
    }
    if(test){
      this.props.history.push("/");
    }
  }
  render(){
    return(
      <form id="register" onSubmit={this.register.bind(this)}>
        <input type="text" onChange={this.setFirst.bind(this)} placeholder="first name" />
        <div className="error">{this.state.firstNameError}</div>
        <input type="text" onChange={this.setLast.bind(this)} placeholder="last name" />
        <div className="error">{this.state.lastNameError}</div>
        <input type="text" onChange={this.setUsername.bind(this)} placeholder="username" />
        <div className="error">{this.state.usernameError}</div>
        <input type="password" onChange={this.setPassword.bind(this)} placeholder="password" />
        <div className="error">{this.state.passwordError}</div>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}

export default withRouter(Register);

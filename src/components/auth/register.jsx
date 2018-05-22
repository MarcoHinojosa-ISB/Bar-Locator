import React from "react";
import {withRouter} from "react-router";
import Axios from "axios";
import store from "../../store/index.jsx";
import {loggedIn} from '../../store/actions/userActions.jsx';

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

    if(!this.checkInputErrors()){
      Axios.post("/api/users/check-duplicate-usernames", this.state)
      .then(result => {
        Axios.post("/api/users/register", this.state)
        .then( result => {
          store.dispatch(loggedIn(this.state.username, this.state.firstName, this.state.lastName))
          this.props.history.push("/")
        })
        .catch( err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({usernameError: "username already exists"});
      })
    }

    return false;
  }
  checkInputErrors(){
    //check for input errors
    var errorFound = false;
    var errors = {username: "", password: "", firstName: "", lastName: ""};

    if(this.state.firstName.length === 0){
      errorFound = true;
      errors.firstName = "First Name cannot be empty";
    }
    else if(!this.state.firstName.match(/^[A-Za-z]/)){
      errorFound = true;
      errors.firstName = "First Name must begin with a letter";
    }
    else if(!this.state.firstName.match(/^\w+$/)){
      errorFound = true;
      errors.firstName = "First Name cannot contain special characters";
    }

    if(this.state.lastName.length === 0){
      errorFound = true;
      errors.lastName = "Last Name cannot be empty";
    }
    else if(!this.state.lastName.match(/^[A-Za-z]/)){
      errorFound = true;
      errors.lastName = "Last Name must begin with a letter";
    }
    else if(!this.state.lastName.match(/^\w+$/)){
      errorFound = true;
      errors.lastName = "Last Name cannot contain special characters";
    }

    if(this.state.username.length < 3){
      errorFound = true;
      errors.username = "Username must be at least 3 characters long";
    }
    else if(!this.state.username.match(/^[A-Za-z]/)){
      errorFound = true;
      errors.username = "Username must begin with a letter";
    }
    else if(!this.state.username.match(/^\w+$/)){
      errorFound = true;
      errors.username = "Username cannot contain special characters";
    }

    if(this.state.password.length < 6){
      errorFound = true;
      errors.password = "Password must be at least 6 characters long";
    }
    else if(!this.state.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)){
      errorFound = true;
      errors.password = "Password must contain 1 letter and 1 number";
    }

    this.setState({
      usernameError: errors.username,
      passwordError: errors.password,
      firstNameError: errors.firstName,
      lastNameError: errors.lastName
    })

    return errorFound;
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

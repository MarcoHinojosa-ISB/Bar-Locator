import React from "react";
import Axios from "axios";
import Venues from "../venues/index.jsx";


class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {location};
  }
  setLocation(event){
    this.setState({location: event.target.value});
  }
  search(e){
    e.preventDefault();

    Axios("/search?location="+this.state.location)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log("error")
    })

    return false;
  }
  render(){
    return (
      <div id="home">
        <br />
        <h2>Search a Venue</h2>
        <form className="search" onSubmit={this.search.bind(this)}>
          <input type="text" placeholder="location" onChange={this.setLocation.bind(this)} />
          <button type="submit" ><i className="fa fa-search"></i></button>
        </form>
        <Venues />
      </div>
    )
  }
}

export default Home;

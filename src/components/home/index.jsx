import React from "react";
import Axios from "axios";
import Venues from "../venues/index.jsx";
import Auth from "../auth/index.jsx";

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {location: "", venues: null, loadingResults: false};
  }
  setLocation(event){
    this.setState({location: event.target.value});
  }
  search(e){
    e.preventDefault();

    this.setState({loadingResults: true});

    Axios("/search?location="+this.state.location)
    .then(result => {
      console.log(result);
      this.setState({venues: result.data.businesses, loadingResults: false})
    })
    .catch(err => {
      console.log(err)
    })

    return false;
  }
  render(){
    return (
      <div id="home">
        <br />
        <h2>Theme park locator</h2>
        <form className="search" onSubmit={this.search.bind(this)}>
          <input type="text" placeholder="location" onChange={this.setLocation.bind(this)} />
          <button type="submit" ><i className="fa fa-search"></i></button>
        </form>
        <Venues venues={this.state.venues} loading={this.state.loadingResults}/>
      </div>
    )
  }
}

export default Home;

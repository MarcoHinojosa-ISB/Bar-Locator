import React from "react";
import Axios from "axios";
import store from "../../store/index.jsx";
import {saveLastSearch} from "../../store/actions/venueActions.jsx";
import Venues from "../venues/index.jsx";
import Auth from "../auth/index.jsx";

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {location: "brownsville, texas", venues: null, loadingResults: false};
  }
  setLocation(event){
    this.setState({location: event.target.value});
  }
  search(e){
    e.preventDefault();

    if(this.state.location.length > 0){
      this.setState({loadingResults: true});

      Axios.get("/api/ex/search?location="+this.state.location)
      .then(result => {
        Axios.post("/api/venues/add-new-venues", result.data)
        .then( result2 => {
          Axios.post("/api/venues/get-people-going", result.data)
          .then( result3 => {
            console.log(result3.data);
            store.dispatch(saveLastSearch(this.state.location, result.data.businesses));
            this.setState({venues: result3.data, loadingResults: false});
          })
          .catch( err3 => {
            console.log(err3);
          })
        })
        .catch( err2 => {
          console.log(err2);
        })

      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  componentDidMount(){
    if(store.getState().venues.venueList)
      this.setState({location: store.getState().venues.location, venues: store.getState().venues.venueList});
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
        <Venues location={this.state.location} venues={this.state.venues} loading={this.state.loadingResults}/>
      </div>
    )
  }
}

export default Home;

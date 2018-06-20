import React from "react";
import Axios from "axios";
import store from "../../store/index.jsx";
import {saveLastSearch, clearSearchData} from "../../store/actions/venueActions.jsx";
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

    if(this.state.location.length > 0){
      this.setState({loadingResults: true});

      // 1st call to fetch for venues based on location
      // 2nd call to add retrieved venues to database if not exist with [people_going] parameter
      // 3rd call to retrieve existiing venues in database
      Axios.get("/api/ex/search?location="+this.state.location)
      .then(result => {
        Axios.post("/api/venues/add-new-venues", result.data)
        .then( result2 => {
          Axios.post("/api/venues/retrieve-venues", result.data)
          .then( result3 => {
            store.dispatch(saveLastSearch(this.state.location, result3.data));
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
  updateVenues(){
    Axios.post("/api/venues/retrieve-venues", store.getState().venues.venueList)
    .then( result => {
      store.dispatch(saveLastSearch(this.state.location, result.data));
      this.setState({venues: result.data, loadingResults: false});
    })
    .catch( err => {
      console.log(err);
    })
  }
  clearSearch(){
    store.dispatch(clearSearchData());
    this.setState({location: "", venues: null, loadingResults: false})
  }
  componentDidMount(){
    if(store.getState().venues.venueList)
      this.setState({location: store.getState().venues.location, venues: store.getState().venues.venueList});
  }
  render(){
    return (
      <div id="home">
        <br />
        <h2>Bar locator</h2>

        <form className="search" onSubmit={this.search.bind(this)}>
          <input type="text" placeholder="location" value={this.state.location} onChange={this.setLocation.bind(this)} />
          <button type="submit" className="submit"><i className="fa fa-search"></i></button>
          <button type="button" className="reset" onClick={this.clearSearch.bind(this)}>Reset</button>
        </form>

        <Venues updateVenues={this.updateVenues.bind(this)} location={this.state.location} venues={this.state.venues} loading={this.state.loadingResults}/>
      </div>
    )
  }
}

export default Home;

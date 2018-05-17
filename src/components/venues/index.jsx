import React from "react";

class Venues extends React.Component{
  constructor(props){
    super(props);
    this.state = {venues: null};
  }

  render(){
    if(!this.state.venues){
      var results = (
        <div className="no-results">
          <h2><i>Find venues with the search bar above</i></h2>
        </div>
      )
    }
    else{
      var results = (
        <div className="some-results">
          <p>Hello World</p>
        </div>
      )
    }

    return (
      <div id="venues">
        {results}
      </div>
    )
  }
}

export default Venues;

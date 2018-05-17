import React from "react";

class Venues extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  displayVenues(){
    return this.props.venues.map((val, i) => {
      var image = val.image_url ? <img src={val.image_url} alt={val.name}></img> : <div className="bad-img-url">No Image available</div>;
      return (
        <div className="venue" key={i}>
          {image}
          <h3>{val.name}</h3>
          <div className="address">{val.location.address1 + ", " + val.location.city + ", " +val.location.country}</div>
          <div className="phone">{val.phone_display}</div>
          <div className="link"><a href={val.url}>View Details</a></div>
        </div>
      );
    })
  }

  render(){
    if(this.props.loading){
      var results =(
        <div className="loading">
          <h2><i className="fa fa-life-ring fa-spin"></i></h2>
        </div>
      )
    }
    else if(!this.props.venues){
      var results = (
        <div className="no-results">
          <h2><i>Find theme parks in your area above</i></h2>
        </div>
      )
    }
    else{
      var list = this.displayVenues();
      var results = (
        <div className="some-results">
          {list}
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

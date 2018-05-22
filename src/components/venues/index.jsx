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
          <h4 className="title">{val.name}</h4>
          <div className="address">{val.address}</div>
          <div className="phone">{val.phone_number}</div>
          <div className="other">
            <div className="link"><a href={val.link}>View Details</a></div>
            <div className="people-going"><span>{val.people_going.length} people going</span></div>
          </div>
          <div className="clearfix"></div>
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
          <h3>parks near {this.props.location}</h3>
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

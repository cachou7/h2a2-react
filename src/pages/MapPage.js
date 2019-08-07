import React, { Component } from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import myData from '../config.json';

class MapPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      json: myData,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      center: {
        lat: 42.28, 
        lng: -83.74
      },
      zoom: 14.5
    }
  }

  componentDidMount() {
    this.setState((prevState) => {
      return {
        json : myData
      }
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  })

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  handleZoom(event) {
    if (event.target.attributes.getNamedItem('data-key').value === '1') {
      var coords = [42.2747, -83.734319]
      this.setState({
        center: {
          lat:coords[0],
          lng: coords[1]
        },
          zoom: 18
      })
    }
    else if (event.target.attributes.getNamedItem('data-key').value === '2') {
      var coords = [42.2805, -83.748344]
      this.setState({
        center: {
          lat:coords[0],
          lng: coords[1]
        },
          zoom: 16.5
      })
    }

    else if (event.target.attributes.getNamedItem('data-key').value === '3') {
      var coords = [42.286, -83.7468]
      this.setState({
        center: {
          lat:coords[0],
          lng: coords[1]
        },
          zoom: 16.25
      })
    }
  }

  loadMarkers(idx, street) {
    var iconImg = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    if (idx === 0) {
      iconImg = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
    else if (idx === 2) {
      iconImg = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }


    return this.state.json[idx][street].map((data, i) => {
      var myDeals = this.state.json[idx][street][i]["deals"][0]
      for (var d = 1; d < this.state.json[idx][street][i]["deals"].length; ++d) {
        myDeals += ", " + this.state.json[idx][street][i]["deals"][d]
      }

      return (
        <Marker 
          onClick={this.onMarkerClick}
          icon={iconImg}
          name={data.full_name}
          phone={data.phone}
          address={data.address}
          website={data.website}
          deals={myDeals}
          hours={data.hours}
          position={{lat: data.latlng[0], lng: data.latlng[1]}} />
      )
    })
  }

  loadMap() {
    //Get day of week
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dates = new Date();
    var day = dates.getDate();
    var month = months[dates.getMonth()];
    var year = dates.getFullYear();
    var today = new Date(month + ' ' + day + ', ' + year);
    var DoW = today.getDay();

    return (
      <Map 
        google={this.props.google} 
        zoom={this.state.zoom} 
        center={this.state.center}
        initialCenter={this.state.center}
        onClick={this.onMapClicked}>

        { this.loadMarkers(0, "southU") }
        { this.loadMarkers(1, "main") }
        { this.loadMarkers(2, "kerrytown") }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div><strong> {this.state.selectedPlace.name} </strong><br/>
              <a href={this.state.selectedPlace.website}>Website</a><br/><br/> 
              <strong>Address: </strong> {this.state.selectedPlace.address}<br/>
              <strong>Phone: </strong> {this.state.selectedPlace.phone}<br/>
              <strong>Today's Happy Hours: </strong> {this.state.selectedPlace.hours} <br/> 
              <strong>Today's Deals: </strong> {this.state.selectedPlace.deals}
            </div>
        </InfoWindow>
      </Map>
    )
  }

  render() {
    var containerStyle = {
      paddingTop: '10%',
      height: '100%'
    };
    var spanStyle = {
      fontFamily: 'Abel',
      fontSize: '20px'
    };
    var southUButtonStyle = {
      backgroundColor: 'rgba(51,51,170,.8)',
      border: '2px solid black'
    };
    var mainStButtonStyle = {
      backgroundColor: 'rgba(170,51,51, .8)',
      border: '2px solid black'
    };
    var kerryTownButtonStyle = {
      backgroundColor: 'rgba(51,170,51,.8)',
      border: '2px solid black'
    };

  	return (
    <body>
      <header className="header">
        <div className="container" id="home">
          <div id="header-navbar">
            <a className="map-header-link" data-value="home" href="/deals">Home</a>
            <a className="map-header-link" data-value="map" href="/map" style={{textAlign: "center"}}>Map View</a>
            <a className="map-header-link" data-value="todaysdeals" href="/today">Today's Deals</a>  
          </div>
        </div>
      </header>

      <div className="container" style={containerStyle}>
        <div className="row" style={{height: "90%"}}>
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <br/><br/><span style={spanStyle}>Choose an area to explore:</span><br/><br/>
            <button type="button" data-key='1' className="btn btn-primary btn-lg btn-block" data-toggle="collapse" data-target=".multi-collapse" id="southu-map" style={southUButtonStyle} onClick={this.handleZoom.bind(this)}>South U</button><br/>
            <button type="button" data-key='2' className="btn btn-danger btn-lg btn-block" id="main-map" style={mainStButtonStyle} onClick={this.handleZoom.bind(this)}>Main St</button><br/>
            <button type="button" data-key='3' className="btn btn-success btn-lg btn-block" id="kerrytown-map" style={kerryTownButtonStyle} onClick={this.handleZoom.bind(this)}>Kerrytown</button>
          </div>
        
          <div className="col-sm-12 col-md-6 col-lg-8 mb-4">
            <div id="map">
              <div style={{position: "relative", height:'100%', width:'100%'}}>
              { this.loadMap() } 
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBfR08tezVdq9huDs5CypaeGeVR7rcUmks&libraries=places"
})(MapPage)
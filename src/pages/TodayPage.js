import React, { Component } from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ButtonGroup, Button } from 'react-bootstrap';
import myData from '../config.json';

class TodayPage extends Component {

  constructor(props) {
    super(props);
    
    console.log(myData);

    var d = new Date();

    this.state = {
      json: myData,
      activeBanner: {},
      selectedDay: d.getDay(),
      clickedText: 'TODAY\'S DEALS'
    }

    this.bannerTitle = [
      'SUNDAY DEALS',
      'MONDAY DEALS',
      'TUESDAY DEALS',
      'WEDNESDAY DEALS',
      'THURSDAY DEALS',
      'FRIDAY DEALS',
      'SATURDAY DEALS'
    ]

    this.DoW = [
      'sun',
      'mon',
      'tue',
      'wed',
      'thu',
      'fri',
      'sat'
    ]
  }

  componentDidMount() {
    var d = new Date();
    console.log(d.getDay());
    this.setState((prevState) => {
      return {
        json : myData,
        active: this.DoW[d.getDay()],
        selectedDay: d.getDay(),
        clickedText: 'TODAY\'S DEALS'
      }
    })
  }

  addActiveClass(event) {
    const clicked = event.target.id
    console.log(clicked)
    if (this.state.active === clicked) { 
      this.setState({active: ''});
    } 
    else {
      this.setState({active: clicked})
    }
  }

  onButtonClick(event) {
    this.setState({
      clickedText: this.bannerTitle[event.target.attributes.getNamedItem('data-key').value],
      selectedDay: event.target.attributes.getNamedItem('data-key').value
    })
  }

  loadContent(street, index) {
    return (
      <div className ="container">
        <div className="row">
            {this.state.json[index][street].map((data, i) => {
              console.log(this.state.selectedDay)
              if (data.day_arr[this.state.selectedDay] === true) {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-4 mb-4" ng-if="bar.day_arr[dayOfWeek] == true">
                    <div className="img-container">
                    <img src={ data.img_urls[0] } alt="First" className="img-fluid"/>

                    <div className="today-overlay">
                      <div className="todayDeals">
                        <h5 className="todaysName noMarg">{ data.full_name }</h5>
                        <p className="todaysInfo noMarg"> { data.address } &middot; { data.phone }</p>
                        <p id="todaysHours">Happy Hours: { data.hours }</p>
                        {data.deals.map((deal, j) => {
                            return (
                              <p className="bar-deals"> {deal}</p>
                            )
                        })}
                    </div>
                    <img className="todayLogo" src={ data.logo } />
                  </div>
                </div>
              </div>
                )
              }
            })}
        </div>
      </div>
    )
  }
  render() {
  	return (
      <div>

        <header className="header" id="todays-background" style={{height: '300px', width:'100%', display:'flex',justifyContent:'center', alignContent: 'center'}}>
          <div className="container" id="home">
          <div id="header-navbar">
        <a className="today-header-link" data-value="home" href="/deals">Home</a>
        <a className="today-header-link" data-value="map" href="/map">Map View</a>
        <a className="today-header-link" data-value="todaysdeals" href="/today">Today's Deals</a>  
      </div>
          <div className="container" id="southu">
      <h2 style={{textAlign: "center", fontSize: "5em", paddingTop: "140px", paddingBottom: "25px", color:"white",fontFamily: 'Unica One'}}>{ this.state.clickedText }</h2>
    </div>
    <div style={{textAlign: "center", margin: "15px", bottom: "10px", fontFamily: 'Alegreya Sans SC'}}>
      <ButtonGroup className="btn-group btn-group-lg" role="group" aria-label="Basic example" onClick={this.onButtonClick.bind(this)}>
        <Button data-key='1' id="mon" type="button" className={`btn ${this.state.active ==="mon"? 'btn-warning' : 'btn-dark'}`} onClick={this.addActiveClass.bind(this)}>Mon</Button>
        <Button data-key='2' id="tue" type="button" className={`btn ${this.state.active ==="tue"? 'btn-warning' : 'btn-dark'}`} onClick={this.addActiveClass.bind(this)}>Tues</Button>
        <Button data-key='3' id="wed" type="button" className={`btn ${this.state.active ==="wed"? 'btn-warning' : 'btn-dark'}`} onClick={this.addActiveClass.bind(this)}>Wed</Button>
        <Button data-key='4' id="thu" type="button" className={`btn ${this.state.active ==="thu"? 'btn-warning' : 'btn-dark'}`} onClick={this.addActiveClass.bind(this)}>Thurs</Button>
        <Button data-key='5' id="fri" type="button" className={`btn ${this.state.active ==="fri"? 'btn-warning' : 'btn-dark'}`} onClick={this.addActiveClass.bind(this)}>Fri</Button>
        <Button data-key='6' id="sat" type="button" className={`btn ${this.state.active ==="sat"? 'btn-warning' : 'btn-dark'}`} onClick={this.addActiveClass.bind(this)}>Sat</Button>
        <Button data-key='0' id="sun" type="button" className={`btn ${this.state.active ==="sun"? 'btn-warning' : 'btn-dark'}`} onClick={this.addActiveClass.bind(this)}>Sun</Button>
      </ButtonGroup>
    </div>
    </div>
  </header>
  <br/>
  <h3 className="todayLoc" style={{marginTop: "10px"}}>SOUTH U</h3>
  { this.loadContent("southU", 0) }
     <br/>
   <h3 className="todayLoc">Main ST</h3>
    <br/>
  { this.loadContent("main", 1) }
       <br/>
   <h3 className="todayLoc">Kerrytown</h3>
    <br/>
  { this.loadContent("kerrytown", 2) }

    </div>
    )
  }
}

export default TodayPage;
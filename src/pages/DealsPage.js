import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Navbar, Nav, NavDropdown, Carousel, Container } from 'react-bootstrap';
import myData from '../config.json';

class DealsPage extends Component {

  constructor(props) {
    super(props);

    this.southUSection = React.createRef()
    this.mainSection = React.createRef()
    this.kerrytownSection = React.createRef()
    
    this.state = {
      json: myData,
      active: {},
      currentScrollHeight: 0
    }

    this.bannerRef = React.createRef()
  }

  componentDidMount() {
    window.onscroll =()=>{
      const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
      if (this.state.currentScrollHeight != newScrollHeight){
        this.setState({currentScrollHeight: newScrollHeight})
      }
    }
    this.setState((prevState) => {
      return {
        json : myData
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleOnClick(event) {
    if (event.target.attributes.getNamedItem('data-value').value === "southu") {
      window.scrollTo(0, this.southUSection.current.offsetTop)
      this.setState ({
        active: "southu"
      })
    }
    else if (event.target.attributes.getNamedItem('data-value').value === "main") {
      window.scrollTo(0, this.mainSection.current.offsetTop)
      this.setState ({
        active: "main"
      })
    }
    else if (event.target.attributes.getNamedItem('data-value').value === "kerrytown") {
      window.scrollTo(0, this.kerrytownSection.current.offsetTop)
      this.setState ({
        active: "kerrytown"
      })
    }
  }

  loadContent(street, index) {
    return (
      <div className ="container">
        <div className="row">
            {this.state.json[index][street].map((data, i) => {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
                  <div className="img-container">
                    <Carousel>
                      <Carousel.Item>
                        <img className="img-fluid" src={ data.img_urls[0] } alt="First"/>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img className="img-fluid" src={ data.img_urls[1] } alt="Second"/>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img className="img-fluid" src={ data.img_urls[2] } alt="Third"/>
                      </Carousel.Item>
                    </Carousel>
                      <div className="overlay">
                        <div className="container">
                          <div className="row justify-content-center">
                              <div className="bar-location col-4 col-sm-4 col-md-4 col-lg-4 text-center">
                                { data.address }
                              </div>
                              <div className="bar-logo col-4 col-sm-4 col-md-4 col-lg-4">
                                <img src={ data.logo } className="img-fluid"/>
                              </div>
                              <div className="bar-number col-4 col-sm-4 col-md-4 col-lg-4 text-center">
                                { data.phone }
                              </div>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="bar-info col-12 col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                              <p>{ data.days } &middot; { data.hours }</p>
                              {data.deals.map((deal, i) => {
                                return (
                                  <p className="bar-deals"> {deal}</p>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            })}
        </div>
      </div>
    )
  }

  render() {
    const opacity = Math.max(this.state.currentScrollHeight / 250, 0)
    var myh2Size = 64;
    var mypSize = 15.5;
    const activeStyle = { color: '#ff3333'}
    console.log(this.state.json[0]["southU"][0])
  	return (
      <body>
      <Navbar bg="dark" expand="lg" variant="dark" fixed="top" style={{opacity}}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="d-flex justify-content-center" id="navbarLocations">
        <Nav className="navbar-nav nav-fill w-70 mr-4">
          <li className="nav-item">
            <Nav.Link className="nav-link text-center" data-value="home" href="/deals">Home</Nav.Link>
          </li>
          <li className="nav-item">
            <NavDropdown title="Locations" id="basic-nav-dropdown dropdownMenuLink">
              <NavDropdown.Item data-value="southu" activeClassName="current" className="dropdown-item nav-link" href="#southu" style={{color:"grey"}} onClick={this.handleOnClick.bind(this)}>South U</NavDropdown.Item>
              <NavDropdown.Item data-value="main" activeClassName="current" className="dropdown-item nav-link" href="#main" style={{color:"grey"}} onClick={this.handleOnClick.bind(this)}>Main St</NavDropdown.Item>
              <NavDropdown.Item data-value="kerrytown" activeClassName="current" className="dropdown-item nav-link" href="#kerrytown" style={{color:"grey"}} onClick={this.handleOnClick.bind(this)}>Kerrytown</NavDropdown.Item>
            </NavDropdown>
          </li>
          <li className="nav-item">
            <Nav.Link className="nav-link text-center" data-value="map" href="/map">Map View</Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link className="nav-link text-center" data-value="today" href="/today">Today's Deals</Nav.Link>
          </li>
        </Nav>
      </Navbar.Collapse>
      </Navbar>

      <header className="header" id="deals-background">
        <div className="container" id="home">
          <div id="header-navbar">
            <a className="header-link" data-value="home" href="#">Home</a>
            <a className="header-link" data-value="map" href="/map">Map View</a>
            <a className="header-link" data-value="todaysdeals" href="/today">Today's Deals</a>
          </div>
          <div className="header-description">
            <h1>
              <h2 style={{fontSize: myh2Size + "px"}}>ann ar&#183;bor</h2>
              <h3>/ &aelig;n arb&#601;r / (noun)</h3>
              <p className="header-definition" style={{fontSize: mypSize + "px"}}>Famous as home to the University of Michigan, Ann Arbor is a bustling college town, urban oasis, and cultural melting pot. The walkable downtown includes galleries, theaters, and museums, and the Ann Arbor Art Fair draws hundreds of thousands of visitors each year.</p>   
            </h1>  
          </div>
        </div>
        <div className="scroller-div">
          <img className="scroller" data-value="southu" onClick={this.handleOnClick.bind(this)} src="https://static.thenounproject.com/png/53743-200.png"/>
          <img className="scrollerB" src="https://i.stack.imgur.com/YPMyN.png"/>
        </div>
      </header>

      <br/>
      <div className="container" id="southu" ref={this.southUSection}>
        <div className="description">
          <h1>
            <h2 style={{fontSize: myh2Size + "px"}}>south u&#183;ni&#183;ver&#183;si&#183;ty</h2>
            <h3>/ sau&#775;th y&#333;&#333;n&#601;'v&#601;rs&#601;d&#275; / (noun)</h3>
            <p className="definition" style={{fontSize: mypSize + "px"}}>South University Avenue is an east-west street on the southern edge of the original University of Michigan campus. It runs east from State Street; after exiting campus, it runs through a commercial area dominated by coffee shops, bars, restaurants and retail establishments that cater to high school and college students. This business area is mostly vacant during the summer and during breaks from school.</p>   
          </h1>  
          </div>
      </div>
      <br/>
      { this.loadContent("southU", 0) }
      <header className="header" id="mainst-background">
        <div className="container" id="main" ref={this.mainSection}>
          <div className="mainst-description">
            <h1>
              <h2 style={{fontSize: myh2Size + "px"}}>main street</h2>
              <h3>/ m&#257;n str&#275;t / (noun)</h3>
              <p class="mainst-definition" style={{fontSize: mypSize + "px"}}>Ann Arbor's Main Street has been widely known for decades. When Bob Seger wrote his song Mainstreet, he was inspired by Ann Arbor, where he grew up. The song recalls a simpler time and place that is distinctively Midwestern. The time and place have changed, of course, but Ann Arbor still has the feeling of Main Street USA.</p>   
            </h1>  
          </div>
        </div>
      </header>
      <br/>
      <br/>
      { this.loadContent("main", 1) }
      <div className="container" id="kerrytown" ref={this.kerrytownSection}>
        <div className="description">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-7">
              <img src="https://cachou7.github.io/h2a2/assets/kerrytown.jpg" class="img-fluid"/>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-5">
              <h1>
                <h2 style={{fontSize: myh2Size + "px"}}>ker&#183;ry&#183;town</h2>
                <h3>/ ker-&#275;tau&#775;n / (noun)</h3>
                <p className="definition" style={{fontSize: mypSize + "px"}}>Kerrytown is a historic district in Ann Arbor, Michigan. It is known for its brick streets and sidewalks, diverse array of shops, and vibrant culture. Kerrytown is home to several iconic establishments, including the Ann Arbor Farmers Market, the Kerrytown Concert House, and Community High School.</p>   
              </h1>  
            </div>
          </div>
        </div>
      </div>
      <br/>
      { this.loadContent("kerrytown", 2)}
      <br/>
    </body>
    )
  }
}

export default DealsPage;
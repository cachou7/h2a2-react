import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class HomePage extends Component {
  render() {
  	var myh2Size = 48;
  	var mypSize = 16;
  	return (
        <header className="header" id="welcome-background">
    		<div className="container">
      			<div className="welcome-description">
        			<h1>
          				<h2 style={{fontSize: myh2Size + "pt"}}>hap&#183;py hour</h2>
          				<h3>/ hap&#275; ou(&#601;)r / (noun)</h3>
          				<p style={{fontSize: mypSize + "px"}}>a period of the day when drinks are sold at reduced prices in a bar or restaurant</p>
          				<Link to ="/deals">
            				<button className="btn btn-outline-light btn-lg">View Deals</button>
          				</Link> 
        			</h1>  
      			</div>
    		</div>
  		</header>
    )
  }
}

export default HomePage;
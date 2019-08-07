import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import DealsPage from './pages/DealsPage'
import TodayPage from './pages/TodayPage'
import './style.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/map" component={MapPage} />
        <Route path="/deals" component={DealsPage} />
        <Route path="/today" component={TodayPage} />
      </Switch>
    )
  }
}

export default App;

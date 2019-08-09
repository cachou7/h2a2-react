import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './style.css'

// const PUBLIC_URL = "https://cachou7.github.io/h2a2-react"

render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
)


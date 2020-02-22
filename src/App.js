import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Pages from "./layout/pages"

import { Provider } from 'react-redux'
import store from "./redux/store"

import './assets/style/App.css'

// Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/css/bootstrap.css"

// Now ui css
import "./assets/scss/now-ui-dashboard.css?v=1.2.0"
import "./assets/style/demo.css"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Pages} />
      </BrowserRouter>
    </Provider>
  )
}

export default App

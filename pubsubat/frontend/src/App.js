import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import ListView from './views/ListView'
import LoginView from './views/LoginView'
import LogoutView from './views/LogoutView'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login/">Login</Link></li>
            <li><Link to="/logout/">Logout</Link></li>
            <Route exact path="/" component={ListView} />
          </ul>
        </div>
      </Router>
    )
  }
}

export default App

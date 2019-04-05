import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Header from './Header'
import List from './List'
import Login from './Login'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/login/" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App

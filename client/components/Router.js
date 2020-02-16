import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Datahandler from './Datahandler'


export default () => (
  <div className="content">
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </div>
)
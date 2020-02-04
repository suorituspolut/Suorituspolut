import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Graph from 'Components/Graph'

export default () => (
  <div className="content">
    <Switch>
      <Route exact path="/" component={Graph} />
    </Switch>
  </div>
)

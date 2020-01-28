import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from "d3"

d3.selectAll("div").style('color','red')

const App = () => (
  <div>
    <p>Hello world frontend </p>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from "d3"

d3.selectAll("div").style('color','red')
.append("svg")
.attr("width", 900)
.attr("height", 600)
.style("border", "5px solid black")

const App = () => (
  <div>
    <p>Hello world frontend </p>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
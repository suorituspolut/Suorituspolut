import React from 'react'
import GraphTestVenn from './Venn'
import Stacked from './Stacked'
import Histograms from './Histogram'
import Bubbles from './Bubbles'
import Sankeys from './Sankey'
import { getCourseData, getRoadToSuccess } from '../../util/redux/dataReducer'

// example for getting the data for RTS
// const rts = JSON.parse(getRoadToSuccess("Tietokantojen perusteet"))
// each separate array of an grade contains: name of the course, the total amount of people done that course, and the percentage
// eg. if you search with "Tietorakenteet and algoritmit",
// you get:
// grade of tira: [name of a popular course, number of people who have done that course, percentage of people who have done that course]


const GraphSelector = ({ graphToShow }) => {
  const courses = JSON.parse(getCourseData())

  const whichGraph = (graph) => {
    switch (graph) {
      case 1:
        return <Sankeys courses={courses} type="normal" />
      case 2:
        return <Sankeys courses={courses} type="firsts" />
      case 3:
        return <Histograms courses={courses} howMany={1} />
      case 4:
        return <Histograms courses={courses} howMany={5} />
      case 5:
        return <Bubbles />
      case 6:
        return <Stacked />
      case 7:
        return <GraphTestVenn />
      default:
        return (
          <>
            <p>All broken; no data, no graph</p>
          </>
        )
    }
  }

  return (
    <div className="graph-container">
      {whichGraph(graphToShow)}
    </div>
  )
}

export default GraphSelector

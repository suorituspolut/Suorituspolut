import React from 'react'
import GraphTestVenn from './Venn'
import Stacked from './Stacked'
import Histograms from './Histogram'
import Bubbles from './Bubbles'
import Sankeys from './Sankey'
import RoadToSuccess from './RoadToSuccess'
import { getCourseData } from '../../util/redux/dataReducer'

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
      case 8:
        return <RoadToSuccess courses={courses} />
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

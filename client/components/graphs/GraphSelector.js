import React from 'react'
import Histograms from './Histogram'
import Bubbles from './Bubbles'
import Sankeys from './Sankey'
import RoadToSuccess from './RoadToSuccess'
import Recommendation from './Recommendation'
import { getCourseData } from '../../util/redux/dataReducer'

import Info from '../notifications/Info'
import infos from '../notifications/Info_contents'

const GraphSelector = ({ graphToShow }) => {
  const courses = JSON.parse(getCourseData()).sort()

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
      case 8:
        return <RoadToSuccess courses={courses} />
      case 9:
        return <Recommendation />
      default:
        return (
          <>
            <p>All broken; no data, no graph</p>
          </>
        )
    }
  }

  return (
    <>
      <div className="graph-container">
        {infos.find(element => element.id === graphToShow) ? <Info content={infos.find(element => element.id === graphToShow).text} /> : undefined}
        {!whichGraph(graphToShow).content ? whichGraph(graphToShow) : <>hi</>}
      </div>
    </>

  )
}

export default GraphSelector

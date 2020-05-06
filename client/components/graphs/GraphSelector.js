import React from 'react'
import Histograms from './Histogram'
import Bubbles from './Bubbles'
import Sankeys from './Sankey'
import RecommendationGrades from './RecommendationGrades'
import RecommendationTime from './RecommendationTime'
import { getCourseData } from '../../util/redux/dataReducer'

import Info from '../notifications/Info'
import infos from '../notifications/Info_contents'

const GraphSelector = ({ graphToShow }) => {
  const courses = JSON.parse(getCourseData()).sort()

  const whichGraph = (graph) => {
    switch (graph) {
      case 1:
        return <Sankeys courses={courses} type="simple" />
      case 2:
        return <Sankeys courses={courses} type="multi" />
      case 3:
        return <Histograms courses={courses} howMany={1} />
      case 4:
        return <Histograms courses={courses} howMany={5} />
      case 5:
        return <Bubbles />
      case 8:
        return <RecommendationGrades courses={courses} />
      case 9:
        return <RecommendationTime />
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
        {whichGraph(graphToShow)}
      </div>
    </>

  )
}

export default GraphSelector

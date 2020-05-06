import React from 'react'
import Histograms from './Histogram'
import Bubbles from './Bubbles'
import Sankeys from './Sankey'
import RecommendationGrades from './RecommendationGrades'
import RecommendationTime from './RecommendationTime'
import { getCourseData, getStudytrackData } from '../../util/redux/dataReducer'

import Info from '../notifications/Info'
import infos from '../notifications/Info_contents'

const GraphSelector = ({ graphToShow }) => {
  const courses = JSON.parse(getCourseData()).sort()
  const studytracks = JSON.parse(getStudytrackData())

  const whichGraph = (graph) => {
    switch (graph) {
      case 'simplesankey':
        return <Sankeys courses={courses} type="simple" />
      case 'multisankey':
        return <Sankeys courses={courses} type="multi" />
      case 'simplehistogram':
        return <Histograms courses={courses} simple />
      case 'multihistogram':
        return <Histograms courses={courses} />
      case 'bubbles':
        return <Bubbles studytracks={studytracks} />
      case 'recommendationGrades':
        return <RecommendationGrades courses={courses} />
      case 'recommendationTime':
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

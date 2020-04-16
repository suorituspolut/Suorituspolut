import React from 'react'
import GraphTestVenn from './Venn'
import Stacked from './Stacked'
import Histograms from './Histogram'
import Bubbles from './Bubbles'
import Sankeys from './Sankey'
import RoadToSuccess from './RoadToSuccess'
import Recommendation from './Recommendation'
import { getCourseData, getRecommendations } from '../../util/redux/dataReducer'

import Info from '../notifications/Info'
import infos from '../notifications/Info_contents'

//  const recommendations = JSON.parse(getRecommendations())
//  At the moment returns studentObjects who have graduated in time
//  To be changed to return recommended courses in /server/datahandling/recommendationHandler

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
    <div margin-left="50">{infos[graphToShow-1] ? <Info content ={infos[graphToShow-1] }/> : "" }</div>
      {whichGraph(graphToShow)}
    </div></>
  )
}

export default GraphSelector

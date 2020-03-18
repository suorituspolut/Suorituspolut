import React from 'react'
import GraphTestVenn from './Venn'
import Stacked from './Stacked'
import Histograms from './Histogram'
import Bubbles from './Bubbles'
import Sankeys from './Sankey'
import { getCourseData } from '../../util/redux/dataReducer'
import Info from 'Components/notifications/Info'


const GraphSelector = ({ graphToShow }) => {

  const courses = JSON.parse(getCourseData()).sort()

  const whichGraph = (graph) => {
    switch (graph) {
      case 1:
        return (<>
        <Info content='Tässä on "sankey"-diagrammi, joka näyttää polun kustakin kurssista seuraavaan kursiin. Eli mitä kurssia mennään yleisimmin suorittamaan kunkin kurssin jälkeen.'/>
        <Sankeys courses={courses} type="normal" /></>)
      case 2:
        return (<>
          <Info content='Tässä on "sankey"-diagrammi, joka näyttää polun kustakin kurssista seuraavaan kursiin. Eli mitä kurssia mennään yleisimmin suorittamaan kunkin kurssin jälkeen. Tässä on myös mukana tasot eli mitä kursseja suoritetaan seuraavien kurssien jälkeen.'/>
           <Sankeys courses={courses} type="firsts" /></>)
      case 3:
        return (<>
        <Info content="Tässä on histogrammi. Tästä voi havaita, missä vaiheessa opintoja opiskelijat käyvät tietyn kurssin."/>
        <Histograms courses={courses} howMany={1} /></>)
      case 4:
        return (<>
        <Info content="Tässä on histogrammi. Tästä voi havaita, missä vaiheessa opintoja opiskelijat käyvät tietyn kurssin."/>
        <Histograms courses={courses} howMany={5} /></>)
      case 5:
        return (<>
        <Info content="Testi teksti"/>
        <Bubbles /></>)
      case 6:
        return (<>
        <Info content="Tämä graafin on tarkoitus näyttää, mitä kursseja on suoritettu useampaan kertaan uudelleen. Eli missä kurssissa suoritusmäärällä ja suorittaneiden määrällä on suurimmat erot."/>
        <Stacked /></>)
      case 7:
        return (<>
        <Info content="Testi teksti"/>
        <GraphTestVenn /></>)
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

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
        <Info content='Tämä Sankey-diagrammi antaa valita kurssin, ja näyttää, mitä kursseja kyseisen kurssin käyneet ovat suorittaneet seuraavassa periodissa. Kurssin lisäksi voi valita aloitusvuoden, ja rajata hakua suoritusten arvosanan perusteella.'/>
        <Sankeys courses={courses} type="normal" /></>)
      case 2:
        return (<>
          <Info content='Tämä Sankey-diagrammi näyttää opintojen etenemisen periodeittain koulutusohjelman ensimmäisistä kursseista lähtien. Suoritusvuoden ja näytettävien periodien määrän voi valita, ja suoritusten arvosanan perusteella voi rajata hakua.'/>
           <Sankeys courses={courses} type="firsts" /></>)
      case 3:
        return (<>
        <Info content="Tämä histogrammi näyttää valitun kurssin suoritusten jakautumisen opiskeluvuosien ja periodien mukaan. Näytettävien opiskeluvuosien määrää voi rajata."/>
        <Histograms courses={courses} howMany={1} /></>)
      case 4:
        return (<>
        <Info content="Tässä on histogrammi jokaisen kurssin suoritusten jakautumiselle opiskeluvuosien ja periodien mukaan. Näytettävien opiskeluvuosien määrää voi rajata."/>
        <Histograms courses={courses} howMany={5} /></>)
      case 5:
        return (<>
        <Info content="Tämä kuplakaavio näyttää jokaisen neljän periodin ja viidennen kesäperiodin suoritetuimmat kurssit. Periodin klikkaaminen piilottaa kyseisen periodin kurssisuoritukset. Suoritusvuoden ja periodeissa näytettävien kurssien määrän voi valita, ja suoritusten arvosanan perusteella voi rajata hakua."/>
        <Bubbles /></>)
      case 6:
        return (<>
        <Info content="Tämä graafin on tarkoitus näyttää, mitä kursseja on suoritettu useampaan kertaan uudelleen. Eli missä kurssissa suoritusmäärällä ja suorittaneiden määrällä on suurimmat erot."/>
        <Stacked /></>)
      case 7:
        return (<>
        <Info content="Tämän graafin on tarkoitus näyttää kaksi kurssia, ja vertailla niiden suoritusten määrää, ja tarkistaa kuinka moni suorittaa molemmat kurssit."/>
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

import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import Footer from './navsAndFooters/Footer'
import GraphSelector from './graphs/GraphSelector'
import NavBar from './navsAndFooters/NavBar'

const App = () => {
  const [graphToShow, setGraphToShow] = useState('bubbles')

  useEffect(() => {
    try {
      ReactGA.initialize(process.env.GA_KEY)
    } catch (error) {
      console.log(error)
    }
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  const handleGraphChange = async (e, { value }) => {
    await graphToShow
    await setGraphToShow(value)
  }
  return (
    <>
      <NavBar onChange={handleGraphChange} value={graphToShow} />
      <GraphSelector graphToShow={graphToShow} />
      <Footer />
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import Footer from './navsAndFooters/Footer'
import GraphSelector from './graphs/GraphSelector'
import NavBar from './navsAndFooters/NavBar'

// To use Google Analytics make a file named .env in the root folder and add the line:
// GA_KEY=<Google Analytics Account Key>

const App = () => {
  const [graphToShow, setGraphToShow] = useState('multisankey')

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

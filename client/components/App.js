import React, { useState } from 'react'
import Footer from './navsAndFooters/Footer'
import GraphSelector from './graphs/GraphSelector'
import NavBar from './navsAndFooters/NavBar'

const App = () => {
  const [graphToShow, setGraphToShow] = useState('bubbles')

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

import React, { useState } from 'react'
import Footer from './navsAndFooters/Footer'
import NavBar from './navsAndFooters/NavBar'
import GraphSelector from './graphs/GraphSelector'


const App = () => {
  const [graphToShow, setGraphToShow] = useState(3)


  const handleGraphChange = (e, { value }) => {
    setGraphToShow(value)
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

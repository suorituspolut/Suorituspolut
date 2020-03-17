import React, { useState } from 'react'
import Footer from 'Components/Footer'
import NavBar from 'Components/NavBar'
import GraphSelector from 'Components/GraphSelector'

const App = () => {
  const [graphToShow, setGraphToShow] = useState(4)

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

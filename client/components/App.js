import React, { useState } from 'react'
import Footer from 'Components/Footer'
import ToggleGraph from 'Components/ToggleGraph'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import DataService from 'Components/dataService'
import NavBar from 'Components/NavBar';



export default () => (
  <>
    <NavBar />
    <DataService />
    <Footer />
  </>
)
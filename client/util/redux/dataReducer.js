import React from 'react'

export const getGraphData = (type) => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `http://localhost:8000/api/data/${type}`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

export const getCourseData = () => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `http://localhost:8000/api/courses`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

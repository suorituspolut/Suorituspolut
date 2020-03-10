export const getGraphData = (type, year, course, grade) => {

  let urlEnd = type

  if (type === 'normal' || type === 'E2E' || type === 'firsts') {
    urlEnd = `${type}/${year}/${course}/${grade}`
  }
  if (process.env.NODE_ENV !== 'production') {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", `http://localhost:8000/api/data/${urlEnd}`, false ) 
    xmlHttp.send( null )
    return xmlHttp.responseText
  }
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `https://toska.cs.helsinki.fi/suorituspolut/api/data/${urlEnd}`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

export const getCourseData = () => {
  if (process.env.NODE_ENV !== 'production') {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", `http://localhost:8000/api/courses`, false ) 
    xmlHttp.send( null )
    return xmlHttp.responseText
  }
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `https://toska.cs.helsinki.fi/suorituspolut/api/courses`, false ) 
  xmlHttp.send( null )
  return xmlHttp.responseText
}

export const getSankeyData = (type, year, course, grade, levels) => {

  const urlEnd = `${type}/${year}/${course}/${grade}/${levels}`

  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open( 'GET', `http://localhost:8000/api/sankey/${urlEnd}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( 'GET', `https://toska.cs.helsinki.fi/suorituspolut/api/sankey/${urlEnd}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getBubbleData = (year, grade, bubbles) => {

  const urlEnd = `${year}/${grade}/${bubbles}`

  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open( 'GET', `http://localhost:8000/api/bubbles/${urlEnd}`, false) 
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( 'GET', `https://toska.cs.helsinki.fi/suorituspolut/api/bubbles/${urlEnd}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getCourseData = () => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open( 'GET', `http://localhost:8000/api/courses`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( 'GET', `https://toska.cs.helsinki.fi/suorituspolut/api/courses`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getHistogramData = (course) => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open( 'GET', `http://localhost:8000/api/histogram/${course}/`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( 'GET', `https://toska.cs.helsinki.fi/suorituspolut/api/histogram/${course}/`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getHistoDataMany = (subset, sorting) => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open( 'GET', `http://localhost:8000/api/histomany/${sorting}/${subset}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest(sorting)
  xmlHttp.open( 'GET', `https://toska.cs.helsinki.fi/suorituspolut/api/histomany/${sorting}/${subset}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getRoadToSuccess = (year, course, uniqueness) => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open( 'GET', `http://localhost:8000/api/rts/${year}/${course}/${uniqueness}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( 'GET', `https://toska.cs.helsinki.fi/suorituspolut/api/rts/${course}/${uniqueness}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getRecommendations = (year, term, studentNumber, goalYears) => {

  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open( 'GET', `http://localhost:8000/api/recommendations/${year}/${term}/${studentNumber}/${goalYears}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open( 'GET', `https://toska.cs.helsinki.fi/suorituspolut/api/recommendations/${year}/${term}/${studentNumber}/${goalYears}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

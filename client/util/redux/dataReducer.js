export const getCourseData = () => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', 'http://localhost:8000/api/courses', false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', 'https://toska.cs.helsinki.fi/suorituspolut/api/courses', false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getStudytrackData = () => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', 'http://localhost:8000/api/studytracks', false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', 'https://toska.cs.helsinki.fi/suorituspolut/api/studytracks', false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getSankeyData = (type, year, course, grade, levels) => {
  const urlEnd = `${type}/${year}/${course}/${grade}/${levels}`

  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/sankey/${urlEnd}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/sankey/${urlEnd}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getSimpleSankeyData = (year, course, grade) => {
  const urlEnd = `${year}/${course}/${grade}`

  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/simplesankey/${urlEnd}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/simplesankey/${urlEnd}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getMultiSankeyData = (year, levels) => {
  const urlEnd = `${year}/${levels}`

  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/multisankey/${urlEnd}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/multisankey/${urlEnd}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getSimpleHistogramData = (course) => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/simplehistogram/${course}/`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/simplehistogram/${course}/`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getMultiHistogramData = (subset, sorting) => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/multihistogram/${sorting}/${subset}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest(sorting)
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/multihistogram/${sorting}/${subset}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getBubbleData = (year, grade, bubbles, studytrack) => {
  const urlEnd = `${year}/${grade}/${bubbles}/${studytrack}`

  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/bubbles/${urlEnd}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/bubbles/${urlEnd}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getRecommendationsGrade = (year, course, uniqueness, studytrack) => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/recommendationsgrade/${year}/${course}/${uniqueness}/${studytrack}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/recommendationsgrade/${year}/${course}/${uniqueness}/${studytrack}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

export const getRecommendationsTime = (year, term, studentNumber, goalYears) => {
  if (process.env.NODE_ENV !== 'production') {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `http://localhost:8000/api/recommendationstime/${year}/${term}/${studentNumber}/${goalYears}`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
  }
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', `https://toska.cs.helsinki.fi/suorituspolut/api/recommendationstime/${year}/${term}/${studentNumber}/${goalYears}`, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

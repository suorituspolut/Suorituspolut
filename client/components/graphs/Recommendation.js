import React, { useEffect, useState } from 'react'
import { getRecommendations } from '../../util/redux/dataReducer'

const Recommendation = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(JSON.parse(getRecommendations()))
  }, [])

  const listTenCourses = (data) => {
    if (data.length > 10) data = data.slice(0, 10)

    return (
      <ul>
        {data.map(course => <li>{course}</li>)}
      </ul>
    )
  }

  if (data && data.length > 0) {
    return (
      <div>
        <h3>Suositeltavat kurssit:</h3>
        {listTenCourses(data)}
      </div>
    )
  }

  return <p>Lataillaan</p>
}


export default Recommendation



const listOfCourses = (data) => {
  const allCourses = data.map(credit => credit.course)
  allCourses.shift()
  return [...new Set(allCourses)]
}

module.exports = {
  listOfCourses
}
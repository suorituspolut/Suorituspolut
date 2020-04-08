const listOfCourses = (data) => {
  const allCourses = data.map(credit => credit.course)
  allCourses.shift()
  const courses = [...new Set(allCourses)].slice(0, 50)

  return courses
}

const mandatoryCourses =
  [
    'Johdatus tietojenkäsittelytieteeseen',
    'Ohjelmoinnin perusteet',
    'Ohjelmoinnin jatkokurssi',
    'Tietokantojen perusteet',
    'Tietokoneen toiminta',
    'Tietoliikenteen perusteet',
    'Ohjelmistotekniikka',
    'Ohjelmistotekniikan menetelmät',
    'Käyttöjärjestelmät',
    'Tietorakenteet ja algoritmit',
    'Laskennan mallit',
    'Ohjelmistotuotanto',
    'Ohjelmistotuotantoprojekti',
    'Kandidaatin tutkielma',
    'Kypsyysnäyte LuK',
    'Tietoturvan perusteet',
    'Johdatus tekoälyyn',
    'Aineopintojen harjoitustyö: Tietokantasovellus',
    'Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit',
    'Aineopintojen harjoitustyö: Tietoliikenne',
  ]

const mathCourses =
  [
    'Johdatus yliopistomatematiikkaan',
    'Raja-arvot',
    'Differentiaalilaskenta',
    'Integraalilaskenta',
    'Lineaarialgebra ja matriisilaskenta I',
    'Lineaarialgebra ja matriisilaskenta II',
    'Todennäköisyyslaskenta I',
    'Sarjat',
    'Vektorianalyysi I',
    'Topologia IA',
    'Topologia IB',
    'Mitta ja integraali',
    'Vektorianalyysi II',
    'Algebralliset rakenteet I',
    'Algebralliset rakenteet II',
    'Differentiaaliyhtälöt I',
    'Differentiaaliyhtälöt II',
    'Johdatus logiikkaan I',
    'Johdatus logiikkaan II',
    'Johdatus lukuteoriaan',
    'Elements of set theory/Joukko-opin alkeet',
    'Kombinatoriikka',
    'Matriisilaskennan sovelluksia',
    'Matemaattinen analyysi I',
    'Matemaattinen analyysi II',
    'Matemaattinen analyysi III',
    'Matemaattinen analyysi IV',
    'Calculus IA: Limits and differentiation',
    'Calculus IB: Integration',
    'Advanced calculus',
  ]

  const csCourses =
  [
    'Advanced calculus',
  ]

const countTheBiggestCourses = (array, amount) => {

  const courseSet = new Map()
  let biggestCourses = []

  array.forEach((course) => {
    const finishCourse = course[1]
    let weight = course[2]
    if (!courseSet.has(finishCourse)) {
      courseSet.set(finishCourse, weight)
    } else {
      weight = courseSet.get(finishCourse) + weight
      courseSet.set(finishCourse, weight)
    }
  })
  const sortedSecondPeriod = new Map([...courseSet.entries()].sort((a, b) => b[1] - a[1]))
  const mapIter = sortedSecondPeriod.keys()
  for (let i = 0; i < amount; i++) {
    biggestCourses = [...biggestCourses, mapIter.next().value]
  }
  return biggestCourses
}


module.exports = {
  listOfCourses,
  mandatoryCourses,
  mathCourses,
  csCourses,
  countTheBiggestCourses,
}

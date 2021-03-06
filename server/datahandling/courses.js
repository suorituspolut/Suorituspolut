const courseData = (data) => {
  const allCourses = data.map(credit => credit.course)
  allCourses.shift()

  const coursesWithOver20Students = []

  const courseSet = new Map()
  allCourses.forEach((course) => {
    if (!courseSet.has(course)) {
      courseSet.set(course, 1)
    } else {
      courseSet.set(course, courseSet.get(course) + 1)
    }
  })
  courseSet.forEach((amount, course) => {
    if (amount >= 20) {
      coursesWithOver20Students.push(course)
    }
  })
  return coursesWithOver20Students
}

const mandatoryCourses = [
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
  'Open uni Cyber Security Base Introduction to Cyber Security',
  'Open uni Cyber Security Base Securing Software',
  'Open uni Cyber Security Base Advanced Topics',
  'Open uni The Elements of AI Introduction to AI',
  'Tietoturvan perusteet',
  'Johdatus tekoälyyn',
  'Aineopintojen harjoitustyö: Tietokantasovellus',
  'Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit',
  'Aineopintojen harjoitustyö: Tietoliikenne',
  'Avoin yo Johdatus tietojenkäsittelytieteeseen',
  'Avoin yo Ohjelmoinnin perusteet',
  'Avoin yo Ohjelmoinnin jatkokurssi',
  'Avoin yo Tietokantojen perusteet',
  'Avoin yo Tietokoneen toiminta',
  'Avoin yo Tietoliikenteen perusteet',
  'Avoin yo Ohjelmistotekniikka',
  'Avoin yo Ohjelmistotekniikan menetelmät',
]

const mathCourses = [
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
  'Avoin yo Johdatus yliopistomatematiikkaan',
  'Avoin yo Raja-arvot',
  'Avoin yo Advanced Calculus',
  'Avoin yo Johdatus logiikkaan',
  'Avoin yo Johdatus logiikkaan I',
  'Avoin yo Lineaarialgebra ja matriisilaskenta I',
  'Avoin yo Lineaarialgebra ja matriisilaskenta II',
  'Avoin yo Todennäköisyyslaskenta I',
  'Avoin yo Calculus I',
  'Avoin yo Calculus II',
]

const csCourses = [
  'Computer Organization I',
  'Data Structures and Algorithms',
  'Johdatus tietojenkäsittelytieteeseen',
  'Ohjelmoinnin jatkokurssi',
  'Ohjelmoinnin perusteet',
  'Tietokantojen perusteet',
  'Tietokoneen toiminta',
  'Aineopintojen harjoitustyö: Tietokantasovellus',
  'Aineopintojen harjoitustyö: Tietoliikenne',
  'Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit',
  'Algoritmit ongelmanratkaisussa',
  'Computer Architecture',
  'Full Stack -websovelluskehitys',
  'Full Stack -websovelluskehitys harjoitustyö',
  'Full Stack -websovelluskehitys, lisäosa',
  'Introduction to Game Programming',
  'Johdatus tekoälyyn',
  'Kandidaatin tutkielma',
  'Kypsyysnäyte LuK',
  'Käyttöjärjestelmät',
  'Laskennan mallit',
  'Network Programming',
  'Ohjelmistotekniikka',
  'Ohjelmistotuotanto',
  'Ohjelmistotuotantoprojekti',
  'Ohjelmointihaasteita I',
  'Open uni Computing and Society',
  'Programming for Performance',
  'Tietoliikenteen perusteet',
  'Tietorakenteet ja algoritmit',
  'Tietoturvan perusteet',
  'Web-palvelinohjelmointi Java',
  'Akateemiset taidot',
  'Äidinkielinen viestintä',
  'Tietokone työvälineenä',
  'Tietotekniikka-alan ammattitehtävissä työskentely',
  'Tutkimustiedonhaku',
  'DevOps with Docker',
  'Introduction to Lambda Calculus',
  'Johdatus funktionaaliseen ohjelmointiin',
  'Kilpaohjelmointi',
  'Linux System Administration',
  'Ohjelmointitekniikka (JavaScript)',
  'Programming in C',
  'Robottiohjelmoinnin harjoitustyö',
  'Tietokannan suunnittelu',
  'UI Application Development with Qt and QML',
  'Web-palvelinohjelmointi Ruby on Rails',
  'Web-palvelinohjelmointi Ruby on Rails, harjoitustyö',
  'Open uni Cyber Security Base Introduction to Cyber Security',
  'Open uni Cyber Security Base Securing Software',
  'Open uni Cyber Security Base Advanced Topics',
  'Open uni The Elements of AI Introduction to AI',
  'Avoin yo Johdatus tietojenkäsittelytieteeseen',
  'Avoin yo Ohjelmoinnin perusteet',
  'Avoin yo Ohjelmoinnin jatkokurssi',
  'Avoin yo Tietokantojen perusteet',
  'Avoin yo Tietokoneen toiminta',
  'Avoin yo Tietoliikenteen perusteet',
  'Avoin yo Ohjelmistotekniikka',
  'Avoin yo Ohjelmistotekniikan menetelmät',
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
  courseData,
  mandatoryCourses,
  mathCourses,
  csCourses,
  countTheBiggestCourses,
}

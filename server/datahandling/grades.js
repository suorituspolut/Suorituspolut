const checkGrade = (wanted, actual) => {
  if (wanted === 'Läpäisseet' && actual !== '0' && actual !== 'Hyl.' && actual !== 'Luop' && actual !== 'Eisa') return true
  if ((wanted === 'Hylätyt' || wanted === '0') && (actual === 'Hyl.' || actual === '0')) return true
  if (wanted !== actual) return false
  return true
}

const dataByGrade = () => [
  {
    grade: 'Hylätty',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 1,
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 2,
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 3,
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 4,
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 5,
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'Tyydyttävät taidot',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'Hyvät taidot',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'Hyväksytty',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'Kaikki läpäisseet',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'Kaikki',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'LUB',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'NSLA',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'CL',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'MCLA',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'ECLA',
    amountOfStudents: 0,
    courses: [],
  },
  {
    grade: 'L',
    amountOfStudents: 0,
    courses: [],
  },
]

const gradeToNumber = (grade) => {
  if (grade === '0'
      || grade === '1'
      || grade === '2'
      || grade === '3'
      || grade === '4'
      || grade === '5') return Number(grade)
  if (grade === 'Eisa' || grade === 'Hyl.' || grade === 'Luop') return 0
  if (grade === 'Hyv.') return 8
  if (grade === 'HT') return 7
  if (grade === 'TT') return 6
  if (grade === 'LUB') return 11
  if (grade === 'NSLA') return 12
  if (grade === 'CL') return 13
  if (grade === 'MCLA') return 14
  if (grade === 'ECLA') return 15
  if (grade === 'L') return 16
  return 8
}

const checkPassed = (grade) => {
  if (grade !== '0' && grade !== 'Hyl.' && grade !== 'Luop' && grade !== 'Eisa') return true
  return false
}

const whichHasBetterGrade = (credit, comp) => {
  const grade1 = gradeToNumber(credit.grade)
  const grade2 = gradeToNumber(comp.grade)

  if (grade1 > grade2) {
    return credit
  }
  return comp
}

module.exports = {
  checkGrade,
  checkPassed,
  dataByGrade,
  gradeToNumber,
  whichHasBetterGrade,
}

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
  }
]

const gradeToNumber = (grade) => {
  switch (grade) {
    case '0' || '1' || '2' || '3' || '4' || '5':
      return Number(grade)
    case 'Eisa' || 'Hyl.':
      return 0
    case 'Hyv.':
      return 1
    case 'HT':
      return 2
    case 'TT':
      return 1
    default:
      return 0
  }
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

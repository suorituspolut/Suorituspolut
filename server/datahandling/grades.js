const checkGrade = (wanted, actual) => {
  if (wanted === 'Läpäisseet' && actual !== '0' && actual !== 'Hyl.' && actual !== 'Luop' && actual !== 'Eisa') return true
  if ((wanted === 'Hylätyt' || wanted === '0') && (actual === 'Hyl.' || actual === '0')) return true
  if (wanted !== actual) return false
  return true
}

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
  gradeToNumber,
  whichHasBetterGrade,
}

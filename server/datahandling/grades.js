

const checkGrade = (wanted, actual) => {
  if (wanted === "Läpäisseet" && actual !== "0" && actual !== "Hyl." && actual !== "Luop" && actual !== "Eisa") return true
  if ((wanted === "Hylätyt" || wanted === "0") && (actual === "Hyl." || actual === "0")) return true
  if (wanted !== actual) return false 
  return true 
}

module.exports =  {
  checkGrade
}
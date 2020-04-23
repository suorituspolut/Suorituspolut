export const createNumberOptions = (start, end) => {
  let startPos = start
  const array = new Array(end - startPos)
  for (let i = 0; i < array.length; i++) {
    array[i] = { key: startPos, value: startPos, text: startPos }
    startPos++
  }
  return array
}

export const createTextOptions = array => array.map(item => ({ key: item, value: item, text: item }))

export const grades = createTextOptions(['Läpäisseet', 'Hylätyt', '1', '2', '3', '4', '5'])

export const blueColors = ['#81d4fa', '#4fc3f7', '#29b6f6', '#039be5', '#0288d1', '#0277bd', '#01579b', '#03396c', '#06010f', '#071F33', '#051e3e']

export const mandatoryCourses = [
  {
    perusopinnot:
      [
        'Johdatus tietojenkäsittelytieteeseen',
        'Ohjelmoinnin perusteet',
        'Ohjelmoinnin jatkokurssi',
        'Tietokantojen perusteet',
        'Tietokoneen toiminta',
      ],
  },
  {
    aineopinnot:
      [
        'Tietoliikenteen perusteet',
        'Ohjelmistotekniikka',
        'Käyttöjärjestelmät',
        'Tietorakenteet ja algoritmit',
        'Laskennan mallit',
        'Ohjelmistotuotanto',
        'Ohjelmistotuotantoprojekti',
        'Kandidaatin tutkielma',
        'Kypsyysnäyte LuK',
      ],
  },
  {
    valinnaisetOpinnot:
      [
        'Tietoturvan perusteet',
        'Johdatus tekoälyyn',
      ],
  },
  {
    aineopintojenHarjoitustyöt:
      [
        'Aineopintojen harjoitustyö: Tietokantasovellus',
        'Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit',
        'Aineopintojen harjoitustyö: Tietoliikenne',
      ],
  },
]

export const terms = createTextOptions(['Syksy', 'Kevät', 'Kesä'])

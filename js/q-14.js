const {
  dateFromText,
  getCommonLength,
  insertCharAt,
  padLeft,
  measure,
  reverseText,
  p,
  eachNumber,
  run,
  xrun,
  prun,
  xprun,
  splitIntoTwoPart,
  sumArray
} = require('./utils')

// n = 9 P r = 3
const COUNTRIES = [
  'Brazil',
  'Croatia',
  'Mexico',
  'Cameroon',
  'Spain',
  'Netherlands',
  'Chile',
  'Australia',
  'Colombia',
  'Greece',
  "Cote d'Ivoire",
  'Japan',
  'Uruguay',
  'Costa Rica',
  'England',
  'Italy',
  'Switzerland',
  'Ecuador',
  'France',
  'Honduras',
  'Argentina',
  'Bosnia and Herzegovina',
  'Iran',
  'Nigeria',
  'Germany',
  'Portugal',
  'Ghana',
  'USA',
  'Belgium',
  'Algeria',
  'Russia',
  'Korea Republic'
]

prun('a', () => {
  function remove (array, entry) {
    array = array.slice()
    const index = array.indexOf(entry)
    array.splice(index, 1)
    return array
  }

  function start (countries, list, result) {
    if (!countries.length) {
      result.push(list)
      return
    }

    const lastChar = list[list.length - 1].slice(-1)
    // console.log(lastChar)
    const candidates = countries.filter(c => c.startsWith(lastChar))
    // console.log(candidates)
    if (!candidates.length) {
      result.push(list)
    } else {
      for (const candidate of candidates) {
        start(remove(countries, candidate), list.concat(candidate), result)
      }
    }
  }

  const countries = COUNTRIES.map(country => country.toUpperCase())

  const result = []
  for (const country of countries) {
    start(remove(countries, country), [country], result)
  }

  let max = 0
  result.forEach(list => {
    max = Math.max(max, list.length)
  })

  result.forEach(list => {
    if (list.length === max) {
      console.log(list.length, list)
    }
  })

  // return [result]
})

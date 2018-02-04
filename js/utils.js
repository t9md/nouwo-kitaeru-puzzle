function measure (subject, fn) {
  console.log(`========= ${subject}`)
  console.time(subject)
  fn()
  console.timeEnd(subject)
}

function xrun () {}

function run (subject, opt, fn) {
  if (typeof opt === 'function') {
    fn = opt
    opt = {}
  }

  console.log(`== ${subject}`)
  if (opt.measure) {
    console.time('time')
  }
  const value = fn()

  if (opt.measure) {
    console.timeEnd('time')
  }

  if (opt.p) {
    const valuesToPrint = Array.isArray(value) ? value : [value]
    p.apply(null, valuesToPrint)
  }
}

function prun (subject, opt, fn) {
  if (typeof opt === 'function') {
    fn = opt
    opt = {}
  }
  opt.p = true
  run(subject, opt, fn)
}

function xprun () {}

function reverseText (text) {
  return text
    .split('')
    .reverse()
    .join('')
}

function eachNumber (start, end, fn) {
  let stopped = false
  const stop = () => (stopped = true)
  for (let i = start; i <= end; i++) {
    fn(i, stop)
    if (stopped) {
      break
    }
  }
}

const {inspect} = require('util')

function p (...args) {
  const text = args.map(arg => inspect(arg, {depth: null})).join(', ')
  console.log(text)
}

function padLeft (targetLength, text, padString = ' ') {
  const amount = targetLength - text.length
  if (amount > 0) {
    return padString.repeat(amount) + text
  } else {
    return text
  }
}

function insertCharAt (text, char, indexes) {
  let lastIndex = 0
  const fragments = []
  for (const index of indexes) {
    fragments.push(text.substring(lastIndex, index))
    lastIndex = index
  }
  fragments.push(text.substring(lastIndex))
  return fragments.join(char)
}

function getCommonLength (textA, textB) {
  let index = 0
  while (true) {
    const charA = textA[index]
    const charB = textB[index]
    if (!charA || !charB) break
    if (charA !== charB) break
    index++
  }
  return index
}

// return [former, middle, later] of text
function splitIntoTwoPart (text) {
  const middleStart = Math.floor(text.length / 2)
  const middleEnd = Math.ceil(text.length / 2)

  const former = text.substring(0, middleStart)
  const middle = text.substring(middleStart, middleEnd)
  const later = text.substring(middleEnd)
  return [former, middle, later]
}

function dateFromText (text) {
  const parsed = Date.parse(text)
  if (!isNaN(parsed)) {
    return new Date(parsed)
  }
}

module.exports = {
  dateFromText,
  padLeft,
  measure,
  p,
  run,
  xrun,
  prun,
  xprun,
  reverseText,
  eachNumber,
  insertCharAt,
  getCommonLength,
  splitIntoTwoPart
}

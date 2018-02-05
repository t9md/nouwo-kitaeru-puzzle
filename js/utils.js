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
  const amount = targetLength - String(text).length
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

function countChar (text, char) {
  return text.split(char).length - 1
}

// pick specified amount of entry from list.
//
//  pickByLoop([1, 2, 3], 0, 3),  // => [ 1, 2, 3 ]
//  pickByLoop([1, 2, 3], 1, 3),  // => [ 2, 3, 1 ]
//  pickByLoop([1, 2, 3], 2, 0),  // => []
//  pickByLoop([1, 2, 3], 3, 3),  // => [ 1, 2, 3 ]
//  pickByLoop([1, 2, 3], 4, 10), // => [ 1, 2, 3, 1, 2, 3, 1, 2, 3, 1 ]
function pickByLoop (list, startIndex, amount) {
  const picked = list.slice(startIndex, startIndex + amount)
  while (picked.length < amount) {
    picked.push(...list.slice(0, amount - picked.length))
  }
  return picked
}

function sumArray (array) {
  return array.reduce((acc, cur) => acc + cur)
}
function multiplyArray (array) {
  return array.reduce((acc, cur) => acc + cur)
}

module.exports = {
  dateFromText,
  padLeft,
  pad: padLeft,
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
  splitIntoTwoPart,
  countChar,
  sumArray,
  multiplyArray
}

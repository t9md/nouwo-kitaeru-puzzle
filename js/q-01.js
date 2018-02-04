const {reverseText, splitIntoTwoPart, eachNumber, run, prun, xprun} = require('./utils')

function isCyclicText (text) {
  const [former, middle, later] = splitIntoTwoPart(text)
  return former === reverseText(later)
}

prun('findCyclicNumber 1', () => {
  let num = 10
  let max = 10000000 // guard

  while (num <= max) {
    const bin = num.toString(2)
    const oct = num.toString(8)
    const dec = num.toString(10)
    if (isCyclicText(bin) && isCyclicText(oct) && isCyclicText(dec)) {
      return num
    }
    num++
  }
})

prun('findCyclicNumber 2', () => {
  // Since 0 starting binary number is not possible
  // We can think of just 1 starding and 1 ending binary.
  // Thus, we can think of ODD number only
  // So, starts with 11 and step by 2(num += 2)
  let num = 11
  let max = 10000000 // guard

  while (num <= max) {
    const bin = num.toString(2)
    const oct = num.toString(8)
    const dec = num.toString(10)

    if (isCyclicText(bin) && isCyclicText(oct) && isCyclicText(dec)) {
      return num
      break
    }
    num += 2
  }
})

String.prototype.isCyclic = function () {
  const reversed = this.split('')
    .reverse()
    .join('')
  return this.toString() === reversed
}

prun('findCyclicNumber 3', () => {
  let num = 11
  let max = 10000000 // guard

  while (num <= max) {
    const bin = num.toString(2)
    const oct = num.toString(8)
    const dec = num.toString(10)
    if (bin.isCyclic() && oct.isCyclic() && dec.isCyclic()) {
      return num
    }
    num += 2
  }
})

Number.prototype.isCyclic = function () {
  const bin = this.toString(2)
  const oct = this.toString(8)
  const dec = this.toString(10)
  return bin.isCyclic() && oct.isCyclic() && dec.isCyclic()
}

prun('findCyclicNumber 4', () => {
  for (let num = 11; num <= 10000000; num += 2) {
    if (num.isCyclic()) {
      return num
    }
  }
})

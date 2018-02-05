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

// prettier-ignore
const european = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
  11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9,
  22, 18, 29, 7, 28, 12, 35, 3, 26
]

// prettier-ignore
const american = [
  0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15,
  3, 24, 36, 13, 1, 0, 27, 10, 25, 29, 12, 8, 19, 31,
  18, 6, 21, 33, 16, 4, 23, 35, 14, 2
]

prun('initial try', {measure: true}, () => {
  function sumFrom (table, startIndex, pickCount) {
    let sum = 0
    let picked = 0
    while (picked < pickCount) {
      sum += table[(startIndex + picked) % table.length]
      picked++
    }
    return sum
  }

  function maxSum (table, pickCount) {
    let max = 0
    for (let i = 0; i < table.length; i++) {
      max = Math.max(max, sumFrom(table, i, pickCount))
    }
    return max
  }

  let ns = []
  for (let n = 2; n <= 36; n++) {
    if (maxSum(european, n) < maxSum(american, n)) {
      ns.push(n)
    }
  }
  return {
    cases: ns.length,
    picks: ns
  }
})

prun('tuned', {measure: true}, () => {
  function maxSum (table, pickCount) {
    let max = sumArray(table.slice(0, pickCount))
    let tmp = max
    for (let i = 0; i < table.length; i++) {
      tmp += table[(i + pickCount) % table.length]
      tmp -= table[i]
      max = Math.max(max, tmp)
    }
    return max
  }

  let ns = []
  for (let n = 2; n <= 36; n++) {
    if (maxSum(european, n) < maxSum(american, n)) {
      ns.push(n)
    }
  }
  return {
    cases: ns.length,
    picks: ns
  }
})

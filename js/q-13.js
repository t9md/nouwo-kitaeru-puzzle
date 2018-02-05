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
//
// factorial 10
// / (10 - 3)
function generateCombination (list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j <= 9; j++) {
      list[i] = j
      console.log(list)
    }
  }
}

function factorial (num) {
  if (num === 0) {
    return 1
  }
  return num * factorial(num - 1)
}
function countPermutation (n, r) {
  return factorial(n) / factorial(n - r)
}
console.log(countPermutation(10, 3))
// console.log(factorial(10))
// console.log(3 * 2 * 1)

// function permutation
// generateCombination([0, 0, 0])
xprun('try', {measure: true}, () => {
  function check (r, e, a, d, w, i, t, l, k, s) {
    const read = r * 1000 + e * 100 + a * 10 + d
    const write = w * 10000 + r * 1000 + i * 100 + t * 10 + e
    const talk = t * 1000 + a * 100 + l * 10 + k
    const skill = s * 10000 + k * 1000 + i * 100 + l * 10 + l
    if (read + write + talk === skill) {
      return `${read} + ${write} + ${talk} = ${skill}`
    }
  }

  function generateCombination (list) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j <= 9; j++) {
        list[i] = j
      }
    }
    list[0][(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)][(r, e, a, d, w, i, t, l, k, s)]
    if (r === 0 || w === 0 || t === 0 || s === 0) {
    }
  }
  generateCombination([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  // R: 2, E: 2, A: 2, D: 1, W: 1, I: 2, T: 2, L: 3, K: 2, S: 1
  const EXP = 'READ + WRITE + TALK = SKILL'
  count = {}
  for (let char of EXP.split('')) {
    if (char.search(/[A-Z]/) === -1) {
      continue
    }
    if (count[char] == null) {
      count[char] = 0
    }
    count[char]++
  }
  console.log(Object.keys(count))
  return count
})

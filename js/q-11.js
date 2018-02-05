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

function dividable (num) {
  const nums = num.toString().split('')
  return num % sumArray(nums.map(e => Number(e))) === 0
}

xprun('just fib', {measure: true}, () => {
  const list = [1, 1]
  function fib (list, max) {
    if (list.length >= max) {
      return list
    }
    return fib(list.concat(list.slice(-2)[0] + list.slice(-1)[0]), max)
  }
  return [fib([1, 1], 3)]
})

xprun('just fib', {measure: true}, () => {
  function fib (n) {
    if (n === 0 || n === 1) {
      return 1
    } else {
      return fib(n - 2) + fib(n - 1)
    }
  }

  let r = []
  for (let n = 0; n <= 10; n++) {
    r.push(fib(n))
  }
  return r
})

prun('[!!!] fib pick dividable', {measure: true}, () => {
  const memo = {}
  function fib (n) {
    if (memo[n] == null) {
      if (n === 0 || n === 1) {
        memo[n] = 1
      } else {
        memo[n] = fib(n - 2) + fib(n - 1)
      }
    }
    return memo[n]
  }

  let n = 0
  let picked = 0
  const r = []

  while (picked < 12) {
    const fibN = fib(n)
    if (dividable(fibN)) {
      r.push(fibN)
      picked++
    }
    n++
  }
  return [r]
})

prun('[BUG] fib pick dividable', {measure: true}, () => {
  function eachFibNumber (fn) {
    let old = 1
    let older = 1
    let stopped = false
    const stop = () => {
      stopped = true
    }
    while (true) {
      let cur = old + older
      // old
      fn(cur, stop)
      if (stopped) {
        break
      }
      older = old
      old = cur
    }
  }

  const result = []
  let count = 0
  eachFibNumber((number, stop) => {
    if (dividable(number)) {
      if (number > 144) {
        count++
        if (count === 4) {
          stop()
        }
      }
      result.push(number)
    }
  })
  return [result]
})

prun('tuned', {measure: true}, () => {
  let pick = 10
  let [a, b] = [1, 1]
  const R = []
  while (R.length < pick) {
    let cur = a + b
    if (dividable(cur)) {
      R.push(cur)
    }
    b = a
    a = cur
  }
  return R
})

const {reverseText, p, eachNumber, run, xrun, prun, xprun} = require('./utils')

prun('loop detect', {measure: true}, () => {
  function isLoop (num) {
    const isEven = num => num % 2 === 0
    let cur = num * 3 + 1
    while (cur !== 1) {
      cur = isEven(cur) ? cur / 2 : cur * 3 + 1
      if (cur === num) {
        return true
      }
    }
    return false
  }

  const numbers = []
  for (let i = 2; i <= 10000; i += 2) numbers.push(i)

  const result = numbers.filter(num => isLoop(num))
  return [result.length, result]
})

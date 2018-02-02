{
  function isLoop(num) {
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

  function run() {
    const numbers = []
    for (let i = 2; i <= 10000; i += 2) numbers.push(i)

    const results = numbers.filter(num => isLoop(num))
    console.log(results.length)
    console.log('---------------')
    console.log(results)
  }
  // const generated = generateCombination([500, 100], 3)
  run()
  // console.log(run)
}

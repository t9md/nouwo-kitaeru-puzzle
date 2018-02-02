function flipCards(cards, step) {
  let index = step - 1
  while (index < cards.length) {
    cards[index] = !cards[index]
    index += step
  }
}

function run() {
  const cards = Array(100).fill(false)
  for (let i = 2; i <= 100; i++) {
    flipCards(cards, i)
  }
  const answer = cards.map((v, index) => !v && index + 1).filter(v => v)
  console.log(answer)
}
run()

function run2() {
  function eachNumber(from, to, fn) {
    for (let i = from; i <= to; i++) fn(i)
  }
  const answer = []
  eachNumber(1, 100, i => {
    let flag = false
    eachNumber(1, 100, j => i % j === 0 && (flag = !flag))
    if (flag) answer.push(i)
  })

  // const answer = []
  // for (let i = 1; i <= 100; i++) {
  //   let flag = false
  //   for (let j = 1; j <= 100; j++) {
  //     if (i % j === 0) flag = !flag
  //   }
  //   if (flag) {
  //     answer.push(i)
  //   }
  // }
  console.log(answer)
}
run2()

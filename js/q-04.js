const {reverseText, eachNumber, run, xrun, prun, xprun} = require('./utils')

function flipCards (cards, step) {
  let index = step - 1
  while (index < cards.length) {
    cards[index] = !cards[index]
    index += step
  }
}

prun('case-1', () => {
  const cards = Array(100).fill(false)
  for (let i = 2; i <= 100; i++) {
    flipCards(cards, i)
  }
  return cards.map((v, index) => !v && index + 1).filter(v => v)
})

prun('case-2', () => {
  const answer = []
  eachNumber(1, 100, i => {
    let flag = false
    eachNumber(1, 100, j => i % j === 0 && (flag = !flag))
    if (flag) answer.push(i)
  })
  return answer
})

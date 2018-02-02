function run() {
  const coins = ['500', '100', '50', '10']
}

function exchange(yen, hardMax = 15) {
  function eachNumber(softMax, fn) {
    const max = Math.min(softMax, hardMax)
    for (let i = 0; i <= max; i++) {
      fn(i)
    }
  }

  count = 0
  combination = []
  eachNumber(yen / 500, coin500 => {
    eachNumber(yen / 100, coin100 => {
      eachNumber(yen / 50, coin50 => {
        eachNumber(yen / 10, coin10 => {
          if (coin500 + coin100 + coin50 + coin10 <= hardMax) {
            const yenTotal = 500 * coin500 + 100 * coin100 + 50 * coin50 + 10 * coin10
            if (yenTotal === yen) {
              combination.push({coin500, coin100, coin50, coin10})
              // count++
            }
          }
        })
      })
    })
  })
  console.log(combination)
  console.log(combination.length)
  // return count
}
// exchange(1000)
// console.log(exchange(1000))

const g = {
  totalCount: 0,
  combination: [],
}

function exchange2(target, coins, usable, nest = 1, combination = {}) {
  const coin = coins.shift()

  if (coins.length === 0) {
    const num_used = target / coin
    if (num_used <= usable) {
      g.totalCount += 1
      combination[coin] = num_used
    }
  } else {
    const indent = '  '.repeat(nest)
    for (let i = 0; i <= target / coin; i++) {
      combination[coin] = i
      exchange2(target - coin * i, coins.slice(), usable - i, ++nest, combination)
    }
  }
}
// exchange2(1000, [500, 100, 50, 10], 20)

{
  function generateCombination(members, usable, combination = new Map(), result = []) {
    if (members.length === 0) {
      result.push(combination)
      return
    }

    const member = members[0]

    // this line is runs at least once(important), so on each combination, members are get emptied
    for (let i = 0; i <= usable; i++) {
      combination.set(member, i)
      generateCombination(members.slice(1), usable - i, new Map(combination), result)
    }
    return result
  }
  const generated = generateCombination([500, 100], 3)
  console.log(generated)
}

function exchange3(target, coins, usable) {
  const combinations = generateCombination(coins, usable)
  return combinations.filter(combination => {
    total = 0
    for (const [key, value] of combination) {
      total += key * value
    }
    return total === target
  })
}
const answer = exchange3(1000, [500, 100, 50, 10], 20)
// console.log(answer)
// console.log(answer.length)
{
  console.log('=================')
  function generateCombination(members, usable, combination = new Map(), result = []) {
    if (members.length === 0) {
      result.push(combination)
      return
    }

    const member = members[0]

    // this line is runs at least once(important), so on each combination, members are get emptied
    for (let i = 0; i <= usable; i++) {
      combination.set(member, i)
      const members = members.slice(1)
      generateCombination(members.slice(1), usable - i, new Map(combination), result)
    }
    return result
  }
  const generated = generateCombination([500, 100], 3)
  console.log(generated)
}

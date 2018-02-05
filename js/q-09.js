const {
  dateFromText,
  getCommonLength,
  insertCharAt,
  padLeft,
  measure,
  reverseText,
  p,
  pad,
  eachNumber,
  run,
  xrun,
  prun,
  xprun,
  splitIntoTwoPart,
  countChar
} = require('./utils')

xprun('initial try', {measure: true}, () => {
  const girl = 10 + 1
  const boy = 20 + 1
  ary = new Array(girl)
  for (let i = 0; i < girl; i++) {
    ary[i] = new Array(boy).fill(0)
  }

  ary[0][0] = 1
  for (let i = 0; i < girl; i++) {
    for (let j = 0; j < boy; j++) {
      if (i !== j && boy - j !== girl - i) {
        if (j > 0) {
          ary[i][j] += ary[i][j - 1]
        }
        if (i > 0) {
          ary[i][j] += ary[i - 1][j]
        }
      }
    }
  }
  console.log(`ary[${girl - 2}][${boy - 1}] = `, ary[girl - 2][boy - 1])
  console.log(`ary[${girl - 1}][${boy - 2}] = `, ary[girl - 1][boy - 2])
  // return ary[girl - 2][boy - 1] + ary[girl - 1][boy - 2]
  return ary[girl - 2][boy - 1] + ary[girl - 1][boy - 2]
})

function buildPaddingTable (table) {
  const padingByColumn = {}
  table.forEach(t => {
    t.forEach((value, column) => {
      padingByColumn[column] = Math.max(value.toString().length, padingByColumn[column] || 0)
    })
  })
  return padingByColumn
}

xprun('explanatory', {measure: true}, () => {
  const girlsMax = 10
  const boysMax = 20

  table = []
  const distance = (max, current) => max - current // for explanatory purpose

  for (let girl = 0; girl <= girlsMax; girl++) {
    table[girl] = []
    for (let boy = 0; boy <= boysMax; boy++) {
      table[girl][boy] = []
      if (girl === 0 && boy === 0) {
        table[girl][boy] = 1
        continue
      } else {
        table[girl][boy] = 0
      }

      if (!(girl === girlsMax && boy === boysMax)) {
        if (girl === boy || distance(boysMax, boy) === distance(girlsMax, girl)) {
          continue
        }
      }
      if (boy > 0) {
        // Reach here by boy arrived(increasing X axis)
        table[girl][boy] += table[girl][boy - 1]
      }
      if (girl > 0) {
        // Reach here by girl arrived(increasing Y axis)
        table[girl][boy] += table[girl - 1][boy]
      }
    }
  }

  const padByColumn = buildPaddingTable(table)

  for (let i = table.length - 1; i >= 0; i--) {
    const rowString = table[i].map((value, column) => pad(padByColumn[column], value)).join(', ')
    console.log(pad(2, i) + ': ' + rowString)
  }
  return table[girlsMax][boysMax]
})

xprun('WRONG ANSWER I need to study more...', {measure: true}, () => {
  const girlsMax = 10
  const boysMax = 20

  table = []
  const distance = (max, current) => max - current // for explanatory purpose

  for (let girl = 0; girl <= girlsMax; girl++) {
    table[girl] = []
    for (let boy = 0; boy <= boysMax; boy++) {
      table[girl][boy] = []
      if (girl === 0 || boy === 0) {
        table[girl][boy] = 1
        continue
      }
      table[girl][boy] = 0

      if (!(girl === girlsMax && boy === boysMax)) {
        if (girl === boy || distance(boysMax, boy) === distance(girlsMax, girl)) {
          continue
        }
      }
      table[girl][boy] += table[girl][boy - 1] // Reach here from left by boy arrived(increasing X axis)
      table[girl][boy] += table[girl - 1][boy] // Reach here from down by girl arrived(increasing Y axis)
    }
  }

  const padByColumn = buildPaddingTable(table)
  for (let i = table.length - 1; i >= 0; i--) {
    const rowString = table[i].map((value, column) => pad(padByColumn[column], value)).join(', ')
    console.log(pad(2, i) + ': ' + rowString)
  }
  return table[girlsMax][boysMax]
})

xprun('official answer', {measure: true}, () => {
  // I think this is not perfectly coffect
  // - In explanation in book
  // - Also how to get final answer(uselessly add 0 + 2417416)
  // - Why since [9, 20] position is not reachable unless girl

  let boy = 20
  let girl = 10
  boy += 1
  girl += 1

  let ary = new Array(girl)
  for (let i = 0; i < girl; i++) {
    ary[i] = new Array(boy)
    for (let j = 0; j < boy; j++) {
      ary[i][j] = 0
    }
  }

  ary[0][0] = 1

  for (let i = 0; i < girl; i++) {
    for (let j = 0; j < boy; j++) {
      if (i != j && boy - j != girl - i) {
        if (j > 0) {
          ary[i][j] += ary[i][j - 1]
        }
        if (i > 0) {
          ary[i][j] += ary[i - 1][j]
        }
      }
    }
  }
  const padByColumn = buildPaddingTable(ary)
  for (let i = ary.length - 1; i >= 0; i--) {
    const rowString = ary[i].map((value, column) => pad(padByColumn[column], value)).join(', ')
    console.log(pad(2, i) + ': ' + rowString)
  }

  return ary[girl - 2][boy - 1] + ary[girl - 1][boy - 2]
})

prun('brute force', {measure: true}, () => {
  // const min = 0b000000000000000000001111111111
  // // const max = 0b000000000000000000011111111110
  // const max = 0b111111111100000000000000000000

  const min = 0b000111111
  const max = 0b111111000

  // const min = 0b000111
  // const max = 0b111000
  const validManCount = countChar(max.toString(2), '1')
  const padLength = max.toString(2).length

  let bins = []

  function canDevideEven (text) {
    let seenMan = 0
    let seenWoman = 0
    let total = 0

    for (const char of text.split('')) {
      total++
      if (char === '1') {
        seenMan++
      } else {
        seenWoman++
      }

      if (seenMan === seenWoman) {
        return total
      }
    }

    seenMan = 0
    seenWoman = 0
    total = text.length
    for (const char of text.split('').reverse()) {
      total--
      if (char === '1') {
        seenMan++
      } else {
        seenWoman++
      }

      if (seenMan === seenWoman) {
        return total
      }
    }
    return total
  }

  for (let i = min; i <= max; i++) {
    const bin = i.toString(2)
    if (countChar(bin, '1') === validManCount) {
      bins.push(pad(padLength, bin, '0'))
    }
  }
  const devidables = []
  const indevidables = []
  for (const bin of bins) {
    const devideAt = canDevideEven(bin)
    if (devideAt > 0 && devideAt < bin.length) {
      const split = bin.split('')
      split.splice(devideAt, 0, '|')
      devidables.push(split.join(''))
    } else {
      indevidables.push(bin)
    }
  }
  // console.log(bins.length)
  console.log(devidables)
  console.log(devidables.length)
  console.log(indevidables)
  console.log(indevidables.length)
  // return [bins.filter(canDevideEven)]
  // console.log(bins)
  // console.log(bins.slice(0, 10))
})

prun('wrong answer small', {measure: true}, () => {
  const girlsMax = 3
  const boysMax = 6

  table = []
  const distance = (max, current) => max - current // for explanatory purpose

  for (let girl = 0; girl <= girlsMax; girl++) {
    table[girl] = []
    for (let boy = 0; boy <= boysMax; boy++) {
      table[girl][boy] = []
      if (girl === 0 || boy === 0) {
        table[girl][boy] = 1
        continue
      }
      table[girl][boy] = 0

      if (!(girl === girlsMax && boy === boysMax)) {
        if (girl === boy || distance(boysMax, boy) === distance(girlsMax, girl)) {
          continue
        }
      }
      table[girl][boy] += table[girl][boy - 1] // Reach here from left by boy arrived(increasing X axis)
      table[girl][boy] += table[girl - 1][boy] // Reach here from down by girl arrived(increasing Y axis)
    }
  }

  const padByColumn = buildPaddingTable(table)
  // console.log(table)

  for (let i = table.length - 1; i >= 0; i--) {
    const rowString = table[i].map((value, column) => pad(padByColumn[column], value)).join(', ')
    console.log(pad(2, i) + ': ' + rowString)
  }
  return table[girlsMax][boysMax]
})

prun('official answer small', {measure: true}, () => {
  // I think this is not perfectly coffect
  // - In explanation in book
  // - Also how to get final answer(uselessly add 0 + 2417416)
  // - Why since [9, 20] position is not reachable unless girl

  let girl = 3
  let boy = 6
  boy += 1
  girl += 1

  let ary = new Array(girl)
  for (let i = 0; i < girl; i++) {
    ary[i] = new Array(boy)
    for (let j = 0; j < boy; j++) {
      ary[i][j] = 0
    }
  }

  ary[0][0] = 1

  for (let i = 0; i < girl; i++) {
    for (let j = 0; j < boy; j++) {
      if (i != j && boy - j != girl - i) {
        if (j > 0) {
          ary[i][j] += ary[i][j - 1]
        }
        if (i > 0) {
          ary[i][j] += ary[i - 1][j]
        }
      }
    }
  }
  const padByColumn = buildPaddingTable(ary)
  for (let i = ary.length - 1; i >= 0; i--) {
    const rowString = ary[i].map((value, column) => pad(padByColumn[column], value)).join(', ')
    console.log(pad(2, i) + ': ' + rowString)
  }

  return ary[girl - 2][boy - 1] + ary[girl - 1][boy - 2]
})

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
  splitIntoTwoPart
} = require('./utils')

function parseDate (date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate()
  }
}

function dateToBinaryString (date) {
  const pad = number => padLeft(2, number.toString(), '0')
  const parsed = parseDate(date)
  const textYYYYMMDD = parsed.year + pad(parsed.month) + pad(parsed.date)
  return Number(textYYYYMMDD).toString(2)
}

run('run without tune', {measure: true}, () => {
  const ONE_DAY_MSEC = 60 * 60 * 24 * 1000
  function nextDay (date) {
    return new Date(date.getTime() + ONE_DAY_MSEC)
  }

  function eachDay (start, end, fn) {
    const endTime = end.getTime()
    let date = start
    while (date.getTime() <= endTime) {
      fn(date)
      date = nextDay(date)
    }
  }

  const startDay = dateFromText('1964/10/10')
  const endDay = dateFromText('2020/07/24')

  eachDay(startDay, endDay, date => {
    const binary = dateToBinaryString(date)
    if (binary === reverseText(binary)) {
      console.log(parseDate(date))
    }
  })
})

run('run by tune', {measure: true}, () => {
  const startDay = dateFromText('1964/10/10')
  const endDay = dateFromText('2020/07/24')
  const buildBin = (number, middle) => {
    const left = padLeft(8, number.toString(2), '0')
    return '1001' + left + middle + reverseText(left) + '1001'
  }
  // start    = 1001-01011101-1-00101011-0010
  // symmetic = 1001-12345678-X-87654321-1001
  // end      = 1001-10100001-1-11010001-0100

  const startLeft = dateToBinaryString(startDay).substring(4, 12) // '01011101'
  const endLeft = dateToBinaryString(endDay).substring(4, 12) // '10100001'
  const startDecimal = parseInt(startLeft, 2)
  const endDecimal = parseInt(endLeft, 2)

  for (let n = startDecimal; n <= endDecimal; n++) {
    for (const middle of ['0', '1']) {
      const binary = buildBin(n, middle)
      const dateString = parseInt(binary, 2).toString()
      const date = dateFromText(insertCharAt(dateString, '/', [4, 6]))
      if (date) {
        console.log(parseDate(date))
      }
    }
  }
})

run('run by tune more sophisticated [heuristically detect common and middle]', {measure: true}, () => {
  // 1. Transform startDate and endDate to binary form
  //   - startDate = 1001010111011001010110010
  //   - endDate   = 1001101000011110100010100
  //
  // 2. Split to left, middle and right part
  //   - startDate = 100101011101-1-001010110010
  //   - endDate   = 100110100001-1-110100010100
  //
  // 3. Detect common text part from left
  //   - startDate = 1001-01011101-1-001010110010
  //   - endDate   = 1001-10100001-1-110100010100
  //                  A      B     C      D
  //
  //                   A: common
  //                   B: left part vary from 01011101...10100001
  //                   C: middle '0' or '1'
  //                   D: right part
  //
  // 4. Build symmetric binary and filter invalid date such as '2000/99/32'.
  //    leftPart        = A + B
  //    middleChar      = C
  //    rightPart       = reverseText(leftPart)
  //    SymmetricBinary = leftPart + middlePart + rightPart

  const startDay = dateFromText('1964/10/10')
  const endDay = dateFromText('2020/07/24')

  const startDayBinary = dateToBinaryString(startDay)
  const endDayBinary = dateToBinaryString(endDay)

  if (startDayBinary.length !== endDayBinary.length) {
    throw new Error('different length in binary form never be synmetric')
  }

  const [startDayLeft, middle, startDayRight] = splitIntoTwoPart(startDayBinary)
  const middleChars = middle ? ['0', '1'] : ['']
  const [endDayLeft, _middle, endDayRight] = splitIntoTwoPart(endDayBinary)
  const commonLength = getCommonLength(startDayLeft, endDayLeft)
  const commonBinary = startDayBinary.substring(0, commonLength)
  const iterationStart = startDayLeft.substring(commonLength)
  const iterationEnd = endDayLeft.substring(commonLength)
  const padTargetLength = iterationStart.length
  const startDecimal = parseInt(iterationStart, 2)
  const endDecimal = parseInt(iterationEnd, 2)

  for (let n = startDecimal; n <= endDecimal; n++) {
    for (const middleChar of middleChars) {
      const leftPart = commonBinary + padLeft(padTargetLength, n.toString(2), '0')
      const rightPart = reverseText(leftPart)
      const symmetricBinary = leftPart + middleChar + rightPart
      const dateString = insertCharAt(parseInt(symmetricBinary, 2).toString(), '/', [4, 6]) // 1966/07/13
      const date = dateFromText(dateString)
      if (date) {
        console.log(parseDate(date))
      }
    }
  }
})

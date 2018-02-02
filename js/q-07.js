const {measure} = require('./utils')
{
  function isReversableDate(date) {
    const binary = Number(toString(date)).toString(2)
    const reversed = binary.split('').reverse().join('') // prettier-ignore
    return binary === reversed
  }

  function parse(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    }
  }

  function toString(date) {
    const pad = s => (s.length === 2 ? s : '0' + s)

    let y = date.getFullYear().toString()
    let m = pad((date.getMonth() + 1).toString())
    let d = pad(date.getDate().toString())
    return y + m + d
  }

  const ONE_DAY_MSEC = 60 * 60 * 24 * 1000

  function nextDay(date) {
    return new Date(date.getTime() + ONE_DAY_MSEC)
  }

  function eachDay(start, end, fn) {
    let date = start
    const endTime = end.getTime()
    while (date.getTime() <= endTime) {
      fn(date)
      date = nextDay(date)
    }
  }

  const startDay = new Date(1964, 10, 10)
  const endDay = new Date(2020, 7, 24)

  measure('run', () => {
    const result = []
    eachDay(startDay, endDay, date => {
      if (isReversableDate(date)) {
        console.log(parse(date))
      }
    })
  })

  measure('run2', () => {
    const buildBin = (left, middle) => {
      const right = left.split('').reverse().join('') // prettier-ignore
      return '1001' + left + middle + right + '1001'
    }
    // s = 1001-01011101-1-00101011-0010
    // X = 1001-12345678-X-12345678-1001
    // e = 1001-10100001-1-11010001-0100
    const pad = s => {
      while (s.length < 8) s = '0' + s
      return s
    }

    const startLeft = Number(toString(startDay)).toString(2).substring(4, 12)
    const endLeft = Number(toString(endDay)).toString(2).substring(4, 12)
    // startLeft = '01011101'
    // endLeft = '10100001'
    const startDecimal = parseInt(startLeft, 2)
    const endDecimal = parseInt(endLeft, 2)

    const insertSlash = dateString => {
      const y = dateString.substring(0, 4)
      const m = dateString.substring(4, 6)
      const d = dateString.substring(6)
      return y + '/' + m + '/' + d
    }

    for (let n = startDecimal; n <= endDecimal; n++) {
      for (const middle of ['0', '1']) {
        const binary = buildBin(pad(n.toString(2)), middle)
        const dateString = parseInt(binary, 2).toString()
        const parsed = Date.parse(insertSlash(dateString))
        if (!isNaN(parsed)) {
          console.log(parse(new Date(parsed)))
        }
      }
    }
  })

}

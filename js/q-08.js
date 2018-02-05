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

function last (array) {
  return array.slice(-1)[0]
}

class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  isEqual (other) {
    return this.x === other.x && this.y === other.y
  }
  translate (other) {
    return new Point(this.x + other.x, this.y + other.y)
  }
  inspect () {
    return `(${this.x}, ${this.y})`
  }
}

function P (x, y) {
  return new Point(x, y)
}

prun('using Point class', {measure: true}, () => {
  function move (history, max) {
    if (history.length === max + 1) {
      return 1
    }

    let cnt = 0
    const directions = [P(0, 1), P(0, -1), P(1, 0), P(-1, 0)]
    directions.forEach(direction => {
      const nextPoint = last(history).translate(direction)
      if (!history.find(point => point.isEqual(nextPoint))) {
        cnt += move(history.concat([nextPoint]), max)
      }
    })
    return cnt
  }
  return move([P(0, 0)], 12)
})

prun('using Point and History class', {measure: true}, () => {
  class History {
    constructor (max) {
      this.max = max
    }

    start () {
      return this.run([P(0, 0)])
    }

    run (history) {
      if (history.length === this.max + 1) {
        return 1
      }

      let cnt = 0
      const directions = [P(0, 1), P(0, -1), P(1, 0), P(-1, 0)]
      directions.forEach(direction => {
        const nextPoint = last(history).translate(direction)
        if (!history.find(point => point.isEqual(nextPoint))) {
          cnt += this.run(history.concat([nextPoint]))
        }
      })
      return cnt
    }
  }
  return new History(12).start()
})

prun('run without tune', {measure: true}, () => {
  function last (array) {
    return array.slice(-1)[0]
  }
  function includes (array, value) {
    return array.find(a => a[0] === value[0] && a[1] === value[1])
  }

  const N = 12
  function move (log) {
    if (log.length === N + 1) {
      return 1
    }

    let cnt = 0
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    directions.forEach(direction => {
      const nextPosition = [last(log)[0] + direction[0], last(log)[1] + direction[1]]
      if (!includes(log, nextPosition)) {
        cnt += move(log.concat([nextPosition]))
      }
    })
    return cnt
  }
  return move([[0, 0]])
})

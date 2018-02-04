const {reverseText, eachNumber, run, xrun, prun, xprun} = require('./utils')

function cutbar1 (barLength, people, numOfBar = 1) {
  if (numOfBar >= barLength) {
    return 0
  } else if (numOfBar < people) {
    return 1 + cutbar1(barLength, people, numOfBar * 2)
  } else {
    return 1 + cutbar1(barLength, people, numOfBar + people)
  }
}

function cutbar2 (barLength, people, bars = 1, count = 0) {
  if (bars >= barLength) {
    return count
  }
  bars += bars < people ? bars : people
  return cutbar2(barLength, people, bars, ++count)
}

function cutbar3 (barLength, people) {
  let count = 0
  let bars = 1
  while (barLength > bars) {
    bars += bars < people ? bars : people
    count++
  }
  return count
}

function cutbar4 (barLength, people) {
  let bars = 1
  let count = 0
  while (!(bars >= barLength)) {
    bars += bars < people ? bars : people
    count++
  }
  return count
}

prun('cutbar1', () => [cutbar1(2, 1), cutbar1(20, 3), cutbar1(20, 20), cutbar1(100, 5)])
prun('cutbar2', () => [cutbar2(2, 1), cutbar2(20, 3), cutbar2(20, 20), cutbar2(100, 5)])
prun('cutbar3', () => [cutbar3(2, 1), cutbar3(20, 3), cutbar3(20, 20), cutbar3(100, 5)])
prun('cutbar4', () => [cutbar4(2, 1), cutbar4(20, 3), cutbar4(20, 20), cutbar4(100, 5)])

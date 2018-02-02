function cutbar(barLength, people, numOfBar = 1) {
  if (numOfBar >= barLength) {
    return 0
  } else if (numOfBar < people) {
    return 1 + cutbar(barLength, people, numOfBar * 2)
  } else {
    return 1 + cutbar(barLength, people, numOfBar + people)
  }
}

function cutbar2(barLength, people, bars = 1, count = 0) {
  if (bars >= barLength) {
    return count
  }
  bars += bars < people ? bars : people
  return cutbar2(barLength, people, bars, ++count)
}

function cutbar3(barLength, people) {
  let count = 0
  let bars = 1
  while (barLength > bars) {
    bars += bars < people ? bars : people
    count++
  }
  return count
}

function cutbar4(barLength, people) {
  let bars = 1
  let count = 0
  while (!(bars >= barLength))  {
    bars += bars < people ? bars : people
    count++
  }
  return count
}

function run() {
  console.log(cutbar(2, 1))
  console.log(cutbar(20, 3))
  console.log(cutbar(20, 20))
  console.log(cutbar(100, 5))
  console.log('--------------')
  console.log(cutbar2(2, 1))
  console.log(cutbar2(20, 3))
  console.log(cutbar2(20, 20))
  console.log(cutbar2(100, 5))
  console.log('--------------')
  console.log(cutbar3(2, 1))
  console.log(cutbar3(20, 3))
  console.log(cutbar3(20, 20))
  console.log(cutbar3(100, 5))
  console.log('--------------')
  console.log(cutbar4(2, 1))
  console.log(cutbar4(20, 3))
  console.log(cutbar4(20, 20))
  console.log(cutbar4(100, 5))
}
run()
// function chop(timberLength, people) {
//   split
//   timberLength = timberLength / 2
//   console.log({timberLength});
//   if (timberLength === 1) {
//     return
//   } else {
//     chop(timberLength)
//   }
// }
// chop(8)

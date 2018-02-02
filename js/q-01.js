function isCyclicText(text) {
  const middleStart = Math.floor(text.length / 2)
  const middleEnd = Math.ceil(text.length / 2)

  const former = text.substring(0, middleStart)
  const later = text.substring(middleEnd)

  const reversedLater = later
    .split('')
    .reverse()
    .join('')
  return former === reversedLater
}

function findCyclicNumber() {
  console.log('=== 1')
  let num = 10
  let max = 10000000 // guard

  while (true) {
    if (num > max) {
      break
    }

    const bin = num.toString(2)
    const oct = num.toString(8)
    const dec = num.toString(10)

    if (isCyclicText(bin) && isCyclicText(oct) && isCyclicText(dec)) {
      break
    }
    num++
  }
  console.log(num)
}

findCyclicNumber()

function findCyclicNumber2() {
  console.log('=== 2')
  let num = 11
  // Since 0 starting binary number is not possible
  // We can think of just 1 starding and 1 ending binary.
  // Thus, we can think of ODD number only
  // So, starts with 11 and step by 2(num += 2)

  let max = 10000000 // guard

  while (true) {
    if (num > max) {
      break
    }

    const bin = num.toString(2)
    const oct = num.toString(8)
    const dec = num.toString(10)

    if (isCyclicText(bin) && isCyclicText(oct) && isCyclicText(dec)) {
      break
    }
    num += 2
  }
  console.log(num)
}
findCyclicNumber2()

String.prototype.isCyclic = function() {
  const reversed = this.split('')
    .reverse()
    .join('')
  return this.toString() === reversed
}

function findCyclicNumber3() {
  console.log('=== 3')
  let num = 11
  let max = 10000000 // guard

  while (true) {
    if (num > max) {
      break
    }
    const bin = num.toString(2)
    const oct = num.toString(8)
    const dec = num.toString(10)
    if (bin.isCyclic() && oct.isCyclic() && dec.isCyclic()) {
      console.log(num)
      break
    }
    num += 2
  }
}
findCyclicNumber3()

Number.prototype.isCyclic = function() {
  const bin = this.toString(2)
  const oct = this.toString(8)
  const dec = this.toString(10)
  return bin.isCyclic() && oct.isCyclic() && dec.isCyclic()
}

function findCyclicNumber4() {
  console.log('=== 4')
  let num = 11
  let max = 10000000 // guard

  while (true) {
    if (num > max) {
      break
    }
    if (num.isCyclic()) {
      console.log(num);
      break
    }
    num += 2
  }
}
findCyclicNumber4()

// String.prototype.isCyclic = function () {
//   return this === this.split("").reverse.join("")
// }
// function findCyclicNumber3() {
//   let num = 11
//   let max = 10000000 // guard
//
//   while (true) {
//     if (num > max) {
//       break
//     }
//     const bin = num.toString(2)
//     const oct = num.toString(8)
//     const dec = num.toString(10)
//     if (bin.isCyclic() && oct.isCyclic() && dec.isCyclic()) {
//       console.log(num);
//       break
//     }
//     num += 2
//   }
//   console.log(num)
// }
// findCyclicNumber2()

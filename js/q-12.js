function uniq (list) {
  return Array.from(new Set(list))
}

function detectRoot (fn) {
  let i = 1
  while (true) {
    i += 1
    const str = fn(Math.sqrt(i)).slice(0, 10)
    if (new Set(str.split('')).size === 10) {
      break
    }
  }
  return i
}

console.log(
  'with int =',
  detectRoot(root => {
    return root.toString().replace('.', '')
  })
)
console.log(
  'only fract =',
  detectRoot(root => {
    return root.toString().split('.')[1] || ''
  })
)

function withInteger () {
  let i = 1
  while (true) {
    i += 1
    const root = Math.sqrt(i)
    const str = root
      .toString()
      .replace('.', '')
      .slice(0, 10)
    if (uniq(str.split('')).length === 10) {
      break
    }
  }
  console.log(i)
}

function withFractional () {
  let i = 1
  while (true) {
    i += 1
    const root = Math.sqrt(i)
    const str = (root.toString().split('.')[1] || '').slice(0, 10)
    if (uniq(str.split('')).length === 10) {
      break
    }
  }
  console.log(i)
}
withInteger()
withFractional()

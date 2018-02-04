const {reverseText, eachNumber, run, xrun} = require('./utils')

run('test', {measure: true}, () => {
  // const ops = ['+', '-', '*', '/', '']
  const ops = ['*', '']
  for (let num = 1000; num <= 9999; num++) {
    if (num.toString().endsWith('0')) {
      continue
    }
    const nums = num.toString().split('')
    const target = reverseText(num.toString())

    for (const op1 of ops) {
      for (const op2 of ops) {
        for (const op3 of ops) {
          const exp = nums[0] + op1 + nums[1] + op2 + nums[2] + op3 + nums[3]
          if (exp.length > 4 && String(eval(exp)) === target) {
            console.log(`${num}: ${exp} = ${target}`)
          }
        }
      }
    }
  }
})

run('test2', {measure: true}, () => {
  const op = ['*', '']
  for (let i = 1000; i < 10000; i++) {
    const c = String(i)
    for (let j = 0; j < op.length; j++) {
      for (let k = 0; k < op.length; k++) {
        for (let l = 0; l < op.length; l++) {
          const val = c.charAt(3) + op[j] + c.charAt(2) + op[k] + c.charAt(1) + op[l] + c.charAt(0)
          // console.log('val', val);
          if (val.length > 4) {
            if (i == eval(val)) {
              console.log(val + ' = ' + i)
            }
          }
        }
      }
    }
  }
})

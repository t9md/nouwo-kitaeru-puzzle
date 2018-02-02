function measure(subject, fn) {
  console.log(`========= ${subject}`)
  console.time(subject)
  fn()
  console.timeEnd(subject)
}

module.exports = {
  measure,
}

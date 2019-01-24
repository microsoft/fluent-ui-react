const _ = require('lodash')

_.mixin({
  sortKeysBy: function(obj, comparator) {
    var keys = _.sortBy(_.keys(obj), function(key) {
      return comparator ? comparator(obj[key], key) : key
    })

    return _.zipObject(
      keys,
      _.map(keys, function(key) {
        return obj[key]
      }),
    )
  },
})

const before = _.sortKeysBy(require('./before.json'))
const after = _.sortKeysBy(require('./after.json'))

console.log('| Test name | Measure | | Before | After | Diff |')
console.log('| --------- | ------- | ------ | ----- | ---- | ')

const compDiff = (a, b) => {
  const sign = a > b ? '-' : '+'
  const result = 100 * Math.abs((a - b) / ((a + b) / 2))

  return `${sign}${_.floor(result, 2)}%`
}

const logLine = (b, a, testName, measure) => {
  const before = b[measure]
  const after = a[measure]

  console.log(
    `| ${testName} | ${measure} | ${before} ms | ${after} ms | ${compDiff(before, after)} |`,
  )
}

_.forEach(before, ({ actualTime: bResult }, testName) => {
  const aResult = after[testName].actualTime

  logLine(bResult, aResult, testName, 'median')
})

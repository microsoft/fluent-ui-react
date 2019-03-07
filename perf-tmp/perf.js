const {
  table,
  getBorderCharacters,
} = require('/Users/levithomason/.config/yarn/global/node_modules/table/dist/index.js')
const _ = require('lodash')
const base = require('./result.json')
const current = require('../perf/dist/result.json')

console.log()

_.forEach(base, (prev, key) => {
  console.log('='.repeat(30))
  console.log(key)
  const curr = current[key]

  console.log(
    table(
      [
        ['BEFORE', 'AFTER', 'SAVED'],
        [
          prev.actualTime.avg,
          curr.actualTime.avg,
          100 - Math.round((curr.actualTime.avg / prev.actualTime.avg) * 100) + '%',
        ],
        [
          prev.actualTime.median,
          curr.actualTime.median,
          100 - Math.round((curr.actualTime.median / prev.actualTime.median) * 100) + '%',
        ],
        [
          prev.actualTime.min,
          curr.actualTime.min,
          100 - Math.round((curr.actualTime.min / prev.actualTime.min) * 100) + '%',
        ],
        [
          prev.actualTime.max,
          curr.actualTime.max,
          100 - Math.round((curr.actualTime.max / prev.actualTime.max) * 100) + '%',
        ],
      ],
      {
        border: getBorderCharacters('void'),
        columnDefault: {
          paddingLeft: 0,
          paddingRight: 2,
        },
        drawHorizontalLine: () => false,
      },
    ),
  )
})

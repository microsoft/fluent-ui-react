const Steps = require('screener-runner/src/steps')
const selector = require('../utils').selector

module.exports = {
  'DropdownExampleSingleSelection.shorthand': [
    {
      name: 'Shows List',
      steps: new Steps()
        .click(selector('trigger-button'))
        .snapshot('Snapshot')
        .end(),
    },
  ],
}

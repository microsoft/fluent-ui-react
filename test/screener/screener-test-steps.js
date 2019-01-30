const Steps = require('screener-runner/src/steps')
const selector = elementTestId => `[data-testid="${elementTestId}"]`

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

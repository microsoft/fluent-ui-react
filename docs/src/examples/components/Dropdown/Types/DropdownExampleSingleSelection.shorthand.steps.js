module.exports = Steps => [
  {
    name: 'Shows List',
    steps: new Steps()
      .click('.ui-dropdown .ui-button')
      .snapshot('Snapshot')
      .end(),
  },
]

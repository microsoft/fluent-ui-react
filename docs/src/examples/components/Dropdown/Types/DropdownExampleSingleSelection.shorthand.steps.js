module.exports = [
  steps => steps.click('.ui-dropdown .ui-button').snapshot('Shows list'),
  steps => steps.click('.ui-list li:nth-child(3)').snapshot('Selects an element'),
  steps =>
    steps.click('.ui-dropdown .ui-button').snapshot('Opens with selected element highlighted'),
  steps => steps.hover('.ui-list li:nth-child(2)').snapshot('Highlights another element'),
]

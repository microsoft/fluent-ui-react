import { Slider } from '@stardust-ui/react/src'

const selectors = {
  input: `.${Slider.slotClassNames.input}`,
}

const config: ScreenerTestsConfig = {
  themes: ['base', 'teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) => builder.keys(selectors.input, keys.tab).snapshot('Focuses the slider'),
    (builder, keys) =>
      builder
        .keys(selectors.input, keys.tab)
        .keys(selectors.input, keys.rightArrow)
        .keys(selectors.input, keys.rightArrow)
        .keys(selectors.input, keys.rightArrow)
        .keys(selectors.input, keys.rightArrow)
        .keys(selectors.input, keys.rightArrow)
        .snapshot('Navigates to the right with the right arrow key'),
    (builder, keys) =>
      builder
        .keys(selectors.input, keys.tab)
        .keys(selectors.input, keys.downArrow)
        .keys(selectors.input, keys.downArrow)
        .keys(selectors.input, keys.downArrow)
        .keys(selectors.input, keys.downArrow)
        .keys(selectors.input, keys.downArrow)
        .snapshot('Navigates to the right with the dow arrow key'),
  ],
}

export default config

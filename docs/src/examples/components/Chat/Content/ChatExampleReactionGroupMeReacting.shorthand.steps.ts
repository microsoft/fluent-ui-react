import { Reaction } from '@stardust-ui/react'

const selectors = {
  reaction: `.${Reaction.className}`,
}

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.click(selectors.reaction).snapshot('Clicks the first reaction'),
    (builder, keys) =>
      builder.keys(selectors.reaction, keys.tab).snapshot('Focuses on the second reaction'),
  ],
}

export default config

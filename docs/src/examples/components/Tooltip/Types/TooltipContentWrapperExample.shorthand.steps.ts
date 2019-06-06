import { Button } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) => builder.keys('body', keys.tab).snapshot('Shows plain tooltip'),
    (builder, keys) =>
      builder
        .keys(`.${Button.className}:nth-of-type(1)`, keys.tab)
        .snapshot('Shows wrapper tooltip'),
  ],
}

export default config

import { ToolbarItem, ToolbarMenuItem } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${ToolbarItem.className}:nth-child(1)`)
        .snapshot('Shows menu')
        .click(`.${ToolbarMenuItem.className}:nth-child(1)`)
        .snapshot('Shows popup'),
  ],
}

export default config

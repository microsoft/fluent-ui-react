import { Reaction, ChatMessage } from '@stardust-ui/react'

const selectors = {
  chatMessageContent: `.${ChatMessage.slotClassNames.content}`,
  reaction: `.${Reaction.className}`,
}

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder.hover(selectors.chatMessageContent).snapshot('Hover chat message to show reactions'),
  ],
}

export default config

import { Reaction, Chat, ChatItem } from '@stardust-ui/react'

const selectors = {
  chatMessageContent: `.${Chat.slotClassNames}:nth-child(2) .${ChatItem.slotClassNames.message}`,
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

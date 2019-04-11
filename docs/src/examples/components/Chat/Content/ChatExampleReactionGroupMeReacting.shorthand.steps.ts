import { Reaction, ChatMessage } from '@stardust-ui/react'

const selectors = {
  chatMessageContent: `.${ChatMessage.slotClassNames.content}`,
  reaction: `.${Reaction.className}`,
}

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.click(selectors.reaction).snapshot('Clicks the first reaction'),
    (builder, keys) =>
      builder.keys(selectors.reaction, keys.tab).snapshot('Set focus on the second reaction'),
    builder => builder.click(selectors.chatMessageContent),
  ],
}

export default config

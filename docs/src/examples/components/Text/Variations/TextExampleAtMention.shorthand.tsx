import React from 'react'
import { Text } from '@stardust-ui/react'

const TextExampleAtMentionShorthand = () => (
  <div>
    <Text atMention="me" content="@Mention Me" />
    <br />
    <Text atMention="other" content="@Mention Another" />
  </div>
)

export default TextExampleAtMentionShorthand

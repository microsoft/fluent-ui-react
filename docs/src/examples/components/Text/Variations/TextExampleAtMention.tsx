import React from 'react'
import { Text } from '@stardust-ui/react'

const TextExampleAtMention = () => (
  <div>
    <Text atMention="me">@mention Me</Text>
    <br />
    <Text atMention="other">@mention another</Text>
  </div>
)

export default TextExampleAtMention

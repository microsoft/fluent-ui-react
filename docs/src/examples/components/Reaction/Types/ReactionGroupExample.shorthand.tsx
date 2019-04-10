import * as React from 'react'
import { Reaction } from '@stardust-ui/react'

const ReactionGroupExample = () => (
  <Reaction.Group
    items={[
      { icon: 'thumbs up', content: '2K', key: 'up' },
      { icon: 'thumbs down', content: 10, key: 'down' },
    ]}
  />
)

export default ReactionGroupExample

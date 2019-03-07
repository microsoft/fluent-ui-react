import * as React from 'react'
import { Reaction } from '@stardust-ui/react'

const ReactionGroupExampleRtl = () => (
  <Reaction.Group
    items={[
      { icon: 'thumbs up', content: '2 الإعجابات', key: 'up' },
      { icon: 'thumbs down', content: '10 يكره', key: 'down' },
    ]}
  />
)

export default ReactionGroupExampleRtl

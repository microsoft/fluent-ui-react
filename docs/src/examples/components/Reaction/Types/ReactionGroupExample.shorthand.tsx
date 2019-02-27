import * as React from 'react'
import { Reaction } from '@stardust-ui/react'

const ReactionGroupExample = () => (
  <Reaction.Group
    items={[{ icon: 'thumbs up', content: 10 }, { icon: 'thumbs down', content: '2K' }]}
  />
)

export default ReactionGroupExample

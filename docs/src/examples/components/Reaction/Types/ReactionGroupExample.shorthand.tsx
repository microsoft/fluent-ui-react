import * as React from 'react'
import { Reaction } from '@stardust-ui/react'

const ReactionGroupExample = () => (
  <Reaction.Group
    items={[{ icon: 'thumbs up', content: '2K' }, { icon: 'thumbs down', content: 10 }]}
  />
)

export default ReactionGroupExample

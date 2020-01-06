import * as React from 'react'
import { Reaction } from '@fluentui/react'

const ReactionGroupExample = () => (
  <Reaction.Group
    items={[
      { icon: { name: 'like' }, content: '2K', key: 'up' },
      { icon: { name: 'emoji' }, content: 10, key: 'smile' },
    ]}
  />
)

export default ReactionGroupExample

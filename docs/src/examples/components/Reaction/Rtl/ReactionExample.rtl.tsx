import * as React from 'react'
import { Reaction } from '@fluentui/react'

const ReactionGroupExampleRtl = () => (
  <Reaction.Group
    items={[
      { icon: { name: 'like' }, content: '2 الإعجابات', key: 'up' },
      { icon: { name: 'emoji' }, content: '10 ابتسامة', key: 'smile' },
    ]}
  />
)

export default ReactionGroupExampleRtl

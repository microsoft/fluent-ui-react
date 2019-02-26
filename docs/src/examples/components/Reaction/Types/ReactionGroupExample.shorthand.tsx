import * as React from 'react'
import { ReactionGroup } from '@stardust-ui/react'

const ReactionGroupExample = () => (
  <ReactionGroup
    items={[
      {
        icon: 'thumbs up',
        content: 10,
      },
      {
        icon: 'thumbs down',
        content: '2K',
      },
    ]}
  />
)

export default ReactionGroupExample

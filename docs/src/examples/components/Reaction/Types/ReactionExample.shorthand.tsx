import * as React from 'react'
import { Reaction, Flex } from '@stardust-ui/react'

const ReactionExample = () => (
  <Flex gap="gap.small">
    <Reaction icon="thumbs up" count={10} />
    <Reaction icon="thumbs down" count="1.2K" />
  </Flex>
)

export default ReactionExample

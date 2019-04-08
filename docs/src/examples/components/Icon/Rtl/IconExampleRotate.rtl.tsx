import * as React from 'react'
import { Flex, Icon } from '@stardust-ui/react'

const IconExampleRotateRtl = () => (
  <Flex gap="gap.smaller">
    <Icon name="call-video" rotate={45} />
    <Icon name="chess rook" rotate={45} />
    <Icon name="book" rotate={45} />
    <Icon name="bullets" rotate={45} />
  </Flex>
)

export default IconExampleRotateRtl

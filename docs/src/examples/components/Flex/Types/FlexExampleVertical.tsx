import * as React from 'react'
import { Flex, Segment } from '@stardust-ui/react'

const FlexExampleVertical = () => (
  <Flex gap="1rem" vertical styles={{ height: '20rem' }}>
    <Segment content="Header" />
    <Flex.Body>
      <Segment content="Main content" />
    </Flex.Body>
    <Segment content="Footer" />
  </Flex>
)

export default FlexExampleVertical

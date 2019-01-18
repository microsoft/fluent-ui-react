import * as React from 'react'
import { Flex, Button, Segment } from '@stardust-ui/react'

const FlexExampleHorizontalPage = () => (
  <Flex gap="1rem" styles={{ height: '20rem' }}>
    <Flex vertical gap="1rem">
      <Button primary iconOnly icon="home" />
      <Button primary iconOnly icon="coffee" />
    </Flex>
    <Segment content="Navigation pane" />
    <Flex.Body>
      <Segment content="Main content" />
    </Flex.Body>
  </Flex>
)

export default FlexExampleHorizontalPage

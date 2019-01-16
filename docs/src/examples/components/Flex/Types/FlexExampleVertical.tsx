import * as React from 'react'
import { Avatar, Flex, Icon, Segment } from '@stardust-ui/react'

const FlexExampleVertical = () => (
  <Flex vertical>
    <Icon name="home" size="larger" />
    <Flex.Body>
      <Segment content="Main area" />
    </Flex.Body>
    <Avatar image="public/images/avatar/small/matt.jpg" />
  </Flex>
)

export default FlexExampleVertical

import * as React from 'react'
import { Avatar, Flex, Icon, Text } from '@stardust-ui/react'

const FlexExampleMessage = () => (
  <Flex gap="1rem">
    <Avatar image="public/images/avatar/small/matt.jpg" />
    <Flex vertical fluid>
      <Flex baseline gap="1rem">
        <Text important content="John Smith" />
        <Flex.Body>
          <Text content="Yesterday 11:13 AM" size="small" disabled />
        </Flex.Body>
        <Icon name="home" />
      </Flex>
      <Text content="How are you? Hope you are doing well" />
    </Flex>
  </Flex>
)

export default FlexExampleMessage

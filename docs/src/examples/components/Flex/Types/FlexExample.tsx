import * as React from 'react'
import { Avatar, Flex, Icon, Text } from '@stardust-ui/react'

const FlexExample = () => (
  <Flex center>
    <Icon name="home" size="larger" />
    <Flex.Body>
      <Text content="Main area" />
    </Flex.Body>
    <Avatar image="public/images/avatar/small/matt.jpg" />
  </Flex>
)

export default FlexExample

import * as React from 'react'
import { Avatar, Flex, Icon, Segment, Text } from '@stardust-ui/react'

const LayoutExampleModel = () => (
  <Flex center>
    <Icon name="home" size="larger" />
    <Flex gap="1rem">
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
    </Flex>
    <Text content="Center" />
    <Flex gap="0.5rem" right>
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
    </Flex>
    <Avatar image="public/images/avatar/small/matt.jpg" />
  </Flex>
)

export default LayoutExampleModel

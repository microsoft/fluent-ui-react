import * as React from 'react'
import { Avatar, Flex, Icon, Segment, Text } from '@stardust-ui/react'

const FlexExampleModel = ({ knobs }) => (
  <Flex center={knobs.center} debug={knobs.debug}>
    <Icon name="home" size="larger" />
    <Flex gap={knobs.gapStart} debug={knobs.debug}>
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
    </Flex>
    <Text content="Center" />
    <Flex gap={knobs.gapEnd} right debug={knobs.debug}>
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
    </Flex>
    <Avatar image="public/images/avatar/small/matt.jpg" />
  </Flex>
)

export default FlexExampleModel

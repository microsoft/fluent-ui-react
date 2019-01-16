import * as React from 'react'
import { Avatar, Flex, Icon, Segment, Text } from '@stardust-ui/react'

const FlexExampleModel = ({ knobs }) => (
  <Flex center>
    <Icon name="home" size="larger" />
    <Flex fluid gap={knobs.leftAreaGap} debug>
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
    </Flex>
    <Text content="Center" />
    <Flex fluid gap={knobs.rightAreaGap} right debug>
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
      <Segment color="primary" inverted />
    </Flex>
    <Avatar image="public/images/avatar/small/matt.jpg" />
  </Flex>
)

export default FlexExampleModel

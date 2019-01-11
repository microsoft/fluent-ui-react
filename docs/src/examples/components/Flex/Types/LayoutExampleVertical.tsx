import * as React from 'react'
import { Avatar, Flex, Icon, Segment, FlexBody } from '@stardust-ui/react'

const LayoutExampleVertical = () => (
  <Flex vertical>
    <Icon name="home" size="larger" />
    <FlexBody>
      <Segment content="Main area" />
    </FlexBody>
    <Avatar image="public/images/avatar/small/matt.jpg" />
  </Flex>
)

export default LayoutExampleVertical

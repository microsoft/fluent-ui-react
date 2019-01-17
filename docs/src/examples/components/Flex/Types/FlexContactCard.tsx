import * as React from 'react'
import { Avatar, Button, Flex, Icon, Text } from '@stardust-ui/react'

const FlexContactCard = () => (
  <Flex gap="1rem" center>
    <Avatar image="public/images/avatar/small/matt.jpg" />
    <Flex.Body>
      <Text content="John Smith" />
    </Flex.Body>
    <Flex center>
      <Button primary iconOnly circular size="small" />
      <Button primary iconOnly circular size="small" />
      <Button primary iconOnly circular size="small" />
      <Button iconOnly circular size="small" />
      <Button iconOnly circular size="small" />
    </Flex>
  </Flex>
)

export default FlexContactCard

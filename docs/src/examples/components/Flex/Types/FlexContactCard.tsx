import * as React from 'react'
import { Avatar, Button, Flex, Text } from '@stardust-ui/react'

const FlexContactCard = () => (
  <Flex gap="1rem" center>
    <Avatar image="public/images/avatar/small/matt.jpg" />
    <Flex fluid vertical left>
      <Text content="John Smith" />
      <Text content="status string" size="smaller" color="red" />
    </Flex>
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

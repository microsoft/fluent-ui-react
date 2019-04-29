import * as React from 'react'
import { Button, Flex, styled } from '@stardust-ui/react'

const ButtonExample = () => (
  <Flex gap="gap.smaller">
    {styled(({ classes }) => (
      <div className={classes.Text.root({ important: true })}>Important text</div>
    ))}
    <Button content="Click here" />
    <Button content="See how this very long text shows up on the button" />
  </Flex>
)

export default ButtonExample

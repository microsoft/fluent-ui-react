import React from 'react'
import { Button, Provider, themes } from '@stardust-ui/react'

const ButtonExample = () => (
  <Provider theme={themes.stardust}>
    <>
      <Button content="Click here" />
      <Button content="See how this very long text shows up on the button" />
    </>
  </Provider>
)

export default ButtonExample

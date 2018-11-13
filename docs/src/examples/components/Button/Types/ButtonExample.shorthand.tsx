import React from 'react'
import {
  Provider,
  Button,
  MyButton,
  MyAccessibleButton,
  buttonBehavior,
  Divider,
} from '@stardust-ui/react'

const ButtonExample = () => (
  <Provider
    theme={{
      componentStyles: {
        MyButton: {
          root: { border: '1px solid red' },
        },
        MyAccessibleButton: {
          root: { border: '1px solid blue' },
        },
      },
    }}
  >
    <>
      <div>
        <MyButton />
        <MyAccessibleButton accessibility={buttonBehavior} disabled>
          I have aria-disabled=true
        </MyAccessibleButton>
      </div>

      <Divider />

      <div>
        <Button content="Click here" />
        <Button content="See how this very long text shows up on the button" />
      </div>
    </>
  </Provider>
)

export default ButtonExample

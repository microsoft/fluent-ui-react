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
  // this Provider defines styles for custom components
  // - component name is intuitively used as a selector
  <Provider
    theme={{
      componentStyles: {
        // styles for MyButton custom component
        MyButton: {
          root: { border: '1px solid red' },
        },

        // styles for MyAccessibleButton custom component
        MyAccessibleButton: {
          root: { border: '1px solid blue' },
        },
      },
    }}
  >
    <>
      <div>
        <MyButton />

        {/* 'accessibility' option for connect() could be introduced for that */}
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

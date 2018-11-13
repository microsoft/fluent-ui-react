import React from 'react'
import {
  Provider,
  Button,
  MyClickableButton,
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
        // styles for MyClickableButton custom component
        MyClickableButton: {
          root: { margin: '0 15px 15px 0' },
        },

        // styles for MyAccessibleButton custom component
        MyAccessibleButton: {
          root: { border: '1px solid grey' },
        },
      },
    }}
  >
    <>
      <Divider>Custom components</Divider>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <MyClickableButton
          onClick={() =>
            alert('Originally I was clickable - if you see this message, then I still am :)')
          }
        >
          Click me!
        </MyClickableButton>

        {/* - provided acc behavior adds necessary attributes to custom component */}
        {/* - 'accessibility' option for connect() could be introduced, so that it won't be necessary to define attribute here. */}
        <MyAccessibleButton disabled accessibility={buttonBehavior}>
          I am disabled and have 'aria-disabled'=true
        </MyAccessibleButton>
      </div>

      <Divider>First-class components</Divider>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button content="Click here" />
        <Button content="See how this very long text shows up on the button" />
      </div>
    </>
  </Provider>
)

export default ButtonExample

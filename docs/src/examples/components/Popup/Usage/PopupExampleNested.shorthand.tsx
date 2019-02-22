import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExample = () => (
  <Popup
    content={{
      content: (
        <>
          <div>Hello from first popup!</div>
          <Popup
            content={{
              content: (
                <>
                  <div>Hello from second popup!</div>

                  <Popup
                    content="Hello from third popup!"
                    trigger={<Button content="Open third" />}
                  />
                </>
              ),
            }}
            trigger={<Button content="Open second" />}
          />
        </>
      ),
    }}
    trigger={<Button content="Open first" />}
  />
)

export default PopupExample

import React from 'react'
import { Button, Input, Popup } from '@stardust-ui/react'

const PopupNoFocusTrapExample = () => (
  <>
    <Popup
      content={{
        content: (
          <>
            <p>
              Focus is trapped.<br />
              Proceed with typing in the input field:
            </p>
            <Input icon="search" placeholder="Search..." />
          </>
        ),
      }}
      trigger={<Button icon="expand" content="Popup that will trap focus" />}
    />

    <Popup
      focusTrap={false}
      content={{
        content: (
          <>
            <p>This popup DOESN'T trap focus.</p>
            <Input icon="search" placeholder="Search..." />
          </>
        ),
      }}
      trigger={<Button icon="expand" content="Popup with no focus trap" />}
    />
  </>
)

export default PopupNoFocusTrapExample

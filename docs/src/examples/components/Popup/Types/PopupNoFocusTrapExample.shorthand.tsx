import React from 'react'
import { Button, Input, Popup, popupBehavior } from '@stardust-ui/react'

const PopupNoFocusTrapExample = () => (
  <Popup
    /** 'popupBehavior' does not use focus trap */
    accessibility={popupBehavior}
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
)

export default PopupNoFocusTrapExample

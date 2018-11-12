import React from 'react'
import { Button, Input, Popup, popupBehavior } from '@stardust-ui/react'

const PopupNoFocusTrapExample = () => (
  <Popup
    /** 'popupFocusTrapBehavior' is used as a default behavior for Popup */
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

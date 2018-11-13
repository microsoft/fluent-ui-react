import React from 'react'
import { Button, Input, Header, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const PopupFocusTrapExample = () => (
  <>
    <Popup
      /** 'popupFocusTrapBehavior' adds focus trap ability to Popup. */
      accessibility={popupFocusTrapBehavior}
      trigger={<Button icon="expand" content="Trap focus on appearence" />}
      content={{
        content: (
          <>
            <Header as="h4">This content traps focus on appearance.</Header>
            <Input icon="search" placeholder="Search..." />
          </>
        ),
      }}
    />
    <Popup
      /** 'popupBehavior' is used as accessibility behavior by default for Popup. Focus is not trapped by default. */
      trigger={<Button icon="expand" content="Do not trap focus" />}
      content={{
        content: (
          <>
            <Header as="h4">Focus is not trapped for this content</Header>
            <Input icon="search" placeholder="Search..." />
          </>
        ),
      }}
    />
  </>
)

export default PopupFocusTrapExample

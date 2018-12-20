import * as React from 'react'
import { Button, Input, Header, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const PopupFocusTrapExample = () => (
  <>
    <Popup
      /** Provided behavior introduces focus trap to popup content. */
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

    {/* Default Popup behavior doesn't introduce focus trap. */}
    <Popup
      trigger={<Button icon="expand" content="Do not trap focus" />}
      content={{
        content: (
          <>
            <Header as="h4">Focus is not trapped for this content.</Header>
            <Input icon="search" placeholder="Search..." />
          </>
        ),
      }}
    />
  </>
)

export default PopupFocusTrapExample

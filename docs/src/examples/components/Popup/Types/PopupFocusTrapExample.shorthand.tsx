import React from 'react'
import { Button, Input, Header, Popup } from '@stardust-ui/react'

const PopupFocusTrapExample = () => (
  <Popup
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
)

export default PopupFocusTrapExample

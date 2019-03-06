import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleInline = () => (
  <Popup
    trigger={<Button icon="expand" />}
    content="This popup is rendered next to the trigger."
    inline
  />
)

export default PopupExampleInline

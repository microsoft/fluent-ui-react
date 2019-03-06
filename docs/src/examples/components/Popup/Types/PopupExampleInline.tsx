import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExample = () => (
  <Popup content="This popup is rendered next to the trigger." inline>
    <Button icon="expand" />
  </Popup>
)

export default PopupExample

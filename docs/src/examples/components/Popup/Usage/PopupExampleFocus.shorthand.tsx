import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleFocus = () => (
  <Popup trigger={<Button icon="expand" />} content="Hello from popup on click!" on="focus" />
)

export default PopupExampleFocus

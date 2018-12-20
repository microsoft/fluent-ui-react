import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleClick = () => (
  <Popup trigger={<Button icon="expand" />} content="Hello from popup on click!" on="click" />
)

export default PopupExampleClick

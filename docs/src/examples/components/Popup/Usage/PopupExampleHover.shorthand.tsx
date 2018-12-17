import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleHover = () => (
  <Popup trigger={<Button icon="expand" />} content="Hello from popup on hover!" on="hover" />
)

export default PopupExampleHover

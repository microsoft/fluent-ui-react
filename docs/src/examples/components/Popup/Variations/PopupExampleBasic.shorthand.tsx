import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleBasic = () => (
  <Popup basic trigger={<Button icon="expand" />} content="Add users to your feed." />
)

export default PopupExampleBasic

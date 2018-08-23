import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleBasic = () => (
  <Popup basic trigger={<Button icon="expand" />}>
    Add users to your feed
  </Popup>
)

export default PopupExampleBasic

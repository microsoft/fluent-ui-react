import React from 'react'
import { List } from '@stardust-ui/react'

const ListExample = () => (
  <List>
    <List.Item
      key="sensor"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
      contentMedia="7:26:56 AM"
    />
    <List.Item
      key="ftp"
      content="Use the online FTP application to input the multi-byte application!"
      contentMedia="11:30:17 PM"
    />
    <List.Item
      key="gb"
      content="The GB pixel is down, navigate the virtual interface!"
      contentMedia="5:22:40 PM"
    />
  </List>
)

export default ListExample

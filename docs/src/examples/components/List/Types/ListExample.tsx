import * as React from 'react'
import { List, Image } from '@stardust-ui/react'

const ListExampleSelectable = ({ knobs }) => (
  <List debug={knobs.debug}>
    <List.Item
      media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
      header="Irving Kuhic"
      headerMedia="7:26:56 AM"
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
    />
    <List.Item
      media={<Image src="public/images/avatar/small/steve.jpg" avatar />}
      header="Skyler Parks"
      headerMedia="11:30:17 PM"
      content="Use the online FTP application to input the multi-byte application!"
    />
    <List.Item
      media={<Image src="public/images/avatar/small/nom.jpg" avatar />}
      header="Dante Schneider"
      headerMedia="5:22:40 PM"
      content="The GB pixel is down, navigate the virtual interface!"
    />
  </List>
)

export default ListExampleSelectable

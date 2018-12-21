import * as React from 'react'
import { List, Image } from '@stardust-ui/react'

const ListExample = ({ knobs }) => (
  <div style={{ width: knobs.width }}>
    <List
      debug={knobs.debug}
      truncateHeader={knobs.truncateHeader}
      truncateContent={knobs.truncateContent}
    >
      <List.Item
        media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
        header="Irving Kuhic - Super long title here"
        headerMedia="7:26:56 AM"
        content="Program the sensor to the SAS alarm through the haptic SQL card!"
        contentMedia="!!"
      />
      <List.Item
        media={<Image src="public/images/avatar/small/steve.jpg" avatar />}
        header="Skyler Parks - Super long title here"
        headerMedia="11:30:17 PM"
        content="Use the online FTP application to input the multi-byte application!"
        contentMedia="!!"
      />
      <List.Item
        media={<Image src="public/images/avatar/small/nom.jpg" avatar />}
        header="Dante Schneider - Super long title here"
        headerMedia="5:22:40 PM"
        content="The GB pixel is down, navigate the virtual interface!"
        contentMedia="!!"
      />
    </List>
  </div>
)

export default ListExample

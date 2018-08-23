import React from 'react'
import { Button, Grid, Popup } from '@stardust-ui/react'

const PopupExamplePosition = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    <Popup position="top start" trigger={<Button icon="expand" />}>
      Popup in top start position
    </Popup>
    <Popup position="top center" trigger={<Button icon="expand" />}>
      Popup in top center position
    </Popup>
    <Popup position="top end" trigger={<Button icon="expand" />}>
      Popup in top end position
    </Popup>
    <Popup position="bottom start" trigger={<Button icon="expand" />}>
      Popup in bottom start position
    </Popup>
    <Popup position="bottom center" trigger={<Button icon="expand" />}>
      Popup in bottom center position
    </Popup>
    <Popup position="bottom end" trigger={<Button icon="expand" />}>
      Popup in bottom end position
    </Popup>
    <Popup position="start center" trigger={<Button icon="expand" />}>
      Popup in start center position
    </Popup>
    <Popup trigger={<Button icon="expand" />}>Popup in default position</Popup>
    <Popup position="end center" trigger={<Button icon="expand" />}>
      Popup in end center position
    </Popup>
  </Grid>
)

export default PopupExamplePosition

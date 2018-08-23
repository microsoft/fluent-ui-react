import React from 'react'
import { Button, Grid, Popup } from '@stardust-ui/react'

const PopupExamplePosition = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    <Popup
      position="top start"
      trigger={<Button icon="expand" />}
      content="Popup in top start position"
    />
    <Popup
      position="top center"
      trigger={<Button icon="expand" />}
      content="Popup in top center position"
    />
    <Popup
      position="top end"
      trigger={<Button icon="expand" />}
      content="Popup in top end position"
    />
    <Popup
      position="bottom start"
      trigger={<Button icon="expand" />}
      content="Popup in bottom start position"
    />
    <Popup
      position="bottom center"
      trigger={<Button icon="expand" />}
      content="Popup in bottom center position"
    />
    <Popup
      position="bottom end"
      trigger={<Button icon="expand" />}
      content="Popup in bottom end position"
    />
    <Popup
      position="start center"
      trigger={<Button icon="expand" />}
      content="Popup in start center position"
    />
    <Popup trigger={<Button icon="expand" />} content="Popup in default position" />
    <Popup
      position="end center"
      trigger={<Button icon="expand" />}
      content="Popup in end center position"
    />
  </Grid>
)

export default PopupExamplePosition

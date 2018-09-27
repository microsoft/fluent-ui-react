import React from 'react'
import { Button, Grid, Popup } from '@stardust-ui/react'

const triggers = [
  { icon: 'arrow circle up', padding: '5px 42px 18px 5px' },
  { icon: 'arrow circle up', padding: '5px 5px 18px 5px' },
  { icon: 'arrow circle up', padding: '5px 5px 18px 42px' },
  { icon: 'arrow circle down', padding: '18px 42px 5px 5px' },
  { icon: 'arrow circle down', padding: '18px 5px 5px 5px' },
  { icon: 'arrow circle down', padding: '18px 5px 5px 42px' },
  { icon: 'arrow circle left', padding: '5px 42px 18px 5px' },
  { icon: 'arrow circle left', padding: '5px 42px 5px 5px' },
  { icon: 'arrow circle left', padding: '18px 42px 5px 5px' },
  { icon: 'arrow circle right', padding: '5px 5px 18px 42px' },
  { icon: 'arrow circle right', padding: '5px 5px 5px 42px' },
  { icon: 'arrow circle right', padding: '18px 5px 5px 42px' },
].map(({ icon, padding }) => (
  <Button icon={icon} styles={{ padding, height: '38px', minWidth: '64px' }} />
))

const PopupExamplePosition = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    <Popup
      align="start"
      position="above"
      trigger={triggers[0]}
      content={
        <p>
          The popup is rendered above the trigger<br />aligned to the start.
        </p>
      }
    />
    <Popup
      align="center"
      position="above"
      trigger={triggers[1]}
      content={
        <p>
          The popup is rendered above the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="end"
      position="above"
      trigger={triggers[2]}
      content={
        <p>
          The popup is rendered above the trigger<br />aligned to the end.
        </p>
      }
    />
    <Popup
      align="start"
      position="below"
      trigger={triggers[3]}
      content={
        <p>
          The popup is rendered below the trigger<br />aligned to the start.
        </p>
      }
    />
    <Popup
      align="center"
      position="below"
      trigger={triggers[4]}
      content={
        <p>
          The popup is rendered below the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="end"
      position="below"
      trigger={triggers[5]}
      content={
        <p>
          The popup is rendered below the trigger<br />aligned to the end.
        </p>
      }
    />
    <Popup
      align="top"
      position="before"
      trigger={triggers[6]}
      content={
        <p>
          The popup is rendered before the trigger<br />aligned to the top.
        </p>
      }
    />
    <Popup
      align="center"
      position="before"
      trigger={triggers[7]}
      content={
        <p>
          The popup is rendered before the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="bottom"
      position="before"
      trigger={triggers[8]}
      content={
        <p>
          The popup is rendered before the trigger<br />aligned to the bottom.
        </p>
      }
    />
    <Popup
      align="top"
      position="after"
      trigger={triggers[9]}
      content={
        <p>
          The popup is rendered after the trigger<br />aligned to the top.
        </p>
      }
    />
    <Popup
      align="center"
      position="after"
      trigger={triggers[10]}
      content={
        <p>
          The popup is rendered after the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="bottom"
      position="after"
      trigger={triggers[11]}
      content={
        <p>
          The popup is rendered after the trigger<br />aligned to the bottom.
        </p>
      }
    />
  </Grid>
)

export default PopupExamplePosition

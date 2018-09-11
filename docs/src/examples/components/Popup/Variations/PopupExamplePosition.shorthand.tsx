import React from 'react'
import { Button, Grid, Popup } from '@stardust-ui/react'

const PopupExamplePosition = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    <Popup
      align="start"
      position="above"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered above the trigger<br />aligned to the start.
        </p>
      }
    />
    <Popup
      align="center"
      position="above"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered above the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="end"
      position="above"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered above the trigger<br />aligned to the end.
        </p>
      }
    />
    <Popup
      align="start"
      position="below"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered below the trigger<br />aligned to the start.
        </p>
      }
    />
    <Popup
      align="center"
      position="below"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered below the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="end"
      position="below"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered below the trigger<br />aligned to the end.
        </p>
      }
    />
    <Popup
      align="top"
      position="before"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered before the trigger<br />aligned to the top.
        </p>
      }
    />
    <Popup
      align="center"
      position="before"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered before the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="bottom"
      position="before"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered before the trigger<br />aligned to the bottom.
        </p>
      }
    />
    <Popup
      align="top"
      position="after"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered after the trigger<br />aligned to the top.
        </p>
      }
    />
    <Popup
      align="center"
      position="after"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered after the trigger<br />aligned to the center.
        </p>
      }
    />
    <Popup
      align="bottom"
      position="after"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is rendered after the trigger<br />aligned to the bottom.
        </p>
      }
    />
  </Grid>
)

export default PopupExamplePosition

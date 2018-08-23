import React from 'react'
import { Button, Grid, Popup } from '@stardust-ui/react'

const PopupExamplePosition = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    <Popup
      position="top-start"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />top-start position
        </p>
      }
    />
    <Popup
      position="top"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />top position
        </p>
      }
    />
    <Popup
      position="top-end"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />top-end position
        </p>
      }
    />
    <Popup
      position="bottom-start"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />bottom-start position
        </p>
      }
    />
    <Popup
      position="bottom"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />bottom position
        </p>
      }
    />
    <Popup
      position="bottom-end"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />bottom-end position
        </p>
      }
    />
    <Popup
      position="before-start"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />before-start position
        </p>
      }
    />
    <Popup
      position="before"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />before position
        </p>
      }
    />
    <Popup
      position="before-end"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />before-end position
        </p>
      }
    />
    <Popup
      position="after-start"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />after-start position
        </p>
      }
    />
    <Popup
      position="after"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />after position
        </p>
      }
    />
    <Popup
      position="after-end"
      trigger={<Button icon="expand" />}
      content={
        <p>
          The popup is being rendered in<br />after-end position
        </p>
      }
    />
  </Grid>
)

export default PopupExamplePosition

import * as React from 'react'
import { Button, Popup, Grid, Text, popupFocusTrapBehavior } from '@stardust-ui/react'

const contentWithButtons = {
  content: (
    <>
      <Button>First</Button>
      <Button primary>Second</Button>
    </>
  ),
}

const PopupExampleOnWithFocusTrap = () => (
  <Grid columns={3} variables={{ gridGap: '10px' }}>
    <Text content="Click" weight="bold" />
    <Text content="Hover" weight="bold" />
    <Text content="Focus" weight="bold" />
    <Popup
      trigger={<Button icon="expand" aria-label="Click button" />}
      content={contentWithButtons}
      accessibility={popupFocusTrapBehavior}
      on="click"
    />
    <Popup
      trigger={<Button icon="expand" aria-label="Hover button" />}
      content={contentWithButtons}
      accessibility={popupFocusTrapBehavior}
      on="hover"
    />
    <Popup
      trigger={<Button icon="expand" aria-label="Focus button" />}
      content={contentWithButtons}
      accessibility={popupFocusTrapBehavior}
      on="focus"
    />
  </Grid>
)

export default PopupExampleOnWithFocusTrap

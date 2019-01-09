import * as React from 'react'
import { Button, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const contentWithButtons = {
  content: (
    <>
      <Button>First</Button>
      <Button primary>Second</Button>
    </>
  ),
}

const PopupExampleOnWithFocusTrap = () => (
  <div>
    <Popup
      trigger={<Button icon="expand" content="Click" aria-label="Click button" />}
      content={contentWithButtons}
      accessibility={popupFocusTrapBehavior}
      on="click"
    />
    <Popup
      trigger={<Button icon="expand" content="Hover" aria-label="Hover button" />}
      content={contentWithButtons}
      accessibility={popupFocusTrapBehavior}
      on="hover"
    />
    <Popup
      trigger={<Button icon="expand" content="Focus" aria-label="Focus button" />}
      content={contentWithButtons}
      accessibility={popupFocusTrapBehavior}
      on="focus"
    />
  </div>
)

export default PopupExampleOnWithFocusTrap

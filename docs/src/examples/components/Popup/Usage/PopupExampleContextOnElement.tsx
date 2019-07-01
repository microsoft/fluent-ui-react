import * as React from 'react'
import { Button, Flex, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const contentWithButtons = {
  content: (
    <Flex gap="gap.smaller">
      <Button>First</Button>
      <Button primary>Second</Button>
    </Flex>
  ),
}

const PopupContextOnElement = () => (
  <Popup
    position="after"
    align="top"
    trigger={
      <div style={{ padding: '4rem', border: 'red dashed' }}>
        <Button content="Random button" onClick={() => alert('Click!')} />
      </div>
    }
    shouldTriggerBeTabbable={false}
    content={contentWithButtons}
    accessibility={popupFocusTrapBehavior}
    on="context"
  />
)

export default PopupContextOnElement

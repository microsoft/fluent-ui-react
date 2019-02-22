import * as React from 'react'
import { Button, Flex, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const contentWithButtons = {
  content: (
    <Flex gap="gap.small">
      <Button>First</Button>
      <Button primary>Second</Button>
    </Flex>
  ),
}

const PopupExampleOnWithFocusTrap = () => (
  <Flex gap="gap.small">
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
  </Flex>
)

export default PopupExampleOnWithFocusTrap

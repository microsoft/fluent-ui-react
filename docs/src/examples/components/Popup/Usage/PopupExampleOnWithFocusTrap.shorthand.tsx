import * as React from 'react'
import { Button, Flex, Popup } from '@stardust-ui/react'

const contentWithButtons = {
  content: (
    <Flex gap="gap.smaller">
      <Button>First</Button>
      <Button primary>Second</Button>
    </Flex>
  ),
}

const PopupExampleOnWithFocusTrap = () => (
  <Flex gap="gap.smaller">
    <Popup
      trigger={<Button icon="expand" content="Click" aria-label="Click button" />}
      content={contentWithButtons}
      trapFocus
      on="click"
    />
    <Popup
      trigger={<Button icon="expand" content="Hover" aria-label="Hover button" />}
      content={contentWithButtons}
      trapFocus
      on="hover"
    />
    <Popup
      trigger={<Button icon="expand" content="Focus" aria-label="Focus button" />}
      content={contentWithButtons}
      trapFocus
      on="focus"
    />
  </Flex>
)

export default PopupExampleOnWithFocusTrap

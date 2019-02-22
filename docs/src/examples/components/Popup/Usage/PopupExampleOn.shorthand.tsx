import * as React from 'react'
import { Button, Flex, Popup } from '@stardust-ui/react'

const PopupExampleOn = () => (
  <Flex gap="gap.small">
    <Popup
      trigger={<Button icon="expand" content="Click" aria-label="Click button" />}
      content="Hello from popup on click!"
      on="click"
    />
    <Popup
      trigger={<Button icon="expand" content="Hover" aria-label="Hover button" />}
      content="Hello from popup on hover!"
      on="hover"
    />
    <Popup
      trigger={<Button icon="expand" content="Focus" aria-label="Focus button" />}
      content="Hello from popup on focus!"
      on="focus"
    />
  </Flex>
)

export default PopupExampleOn

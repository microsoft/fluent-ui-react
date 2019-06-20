import * as React from 'react'
import { Button, Flex, Popup } from '@stardust-ui/react'

const PopupExampleOnMultiple = () => (
  <>
    <Flex gap="gap.smaller" padding="padding.medium">
      <Popup
        trigger={
          <Button icon="expand" content="Click + Focus" aria-label="Click or focus button" />
        }
        content="Hello from popup on click!"
        on={['click', 'focus']}
      />
      <Popup
        trigger={
          <Button icon="expand" content="Hover + Focus" aria-label="Hover or focus button" />
        }
        content="Hello from popup on hover!"
        on={['hover', 'focus']}
      />
    </Flex>
    <Flex gap="gap.smaller" padding="padding.medium">
      <Popup
        trigger={
          <Button
            icon="expand"
            content="Context + Focus"
            aria-label="Right click or focus button"
            onClick={() => alert('Click!')}
          />
        }
        content="Hello from popup on click!"
        on={['context', 'focus']}
      />
      <Popup
        trigger={
          <Button
            icon="expand"
            content="Context + Hover"
            aria-label="Right click or hover button"
            onClick={() => alert('Click!')}
          />
        }
        content="Hello from popup on hover!"
        on={['context', 'hover']}
      />
      <Popup
        trigger={
          <Button
            icon="expand"
            content="Context + Hover + Focus"
            aria-label="Right click or hover or focus button"
            onClick={() => alert('Click!')}
          />
        }
        content="Hello from popup on hover!"
        on={['context', 'hover', 'focus']}
      />
    </Flex>
  </>
)

export default PopupExampleOnMultiple

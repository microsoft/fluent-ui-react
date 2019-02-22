import * as React from 'react'
import { Button, Flex, Popup } from '@stardust-ui/react'

const PopupContentWrapperExample = () => {
  const plainContentStyle = {
    zIndex: 1000,
    padding: 5,
  }

  return (
    <Flex gap="gap.small">
      <Popup
        content={<p style={plainContentStyle}>Plain popup content rendered 'as is'.</p>}
        trigger={<Button icon="expand" content="Popup with plain content" />}
      />

      <Popup
        content={{ content: <p style={plainContentStyle}>Popup content rendered in wrapper.</p> }}
        trigger={<Button icon="expand" content="Popup with wrapped content" />}
      />
    </Flex>
  )
}

export default PopupContentWrapperExample

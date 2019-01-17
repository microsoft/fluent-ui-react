import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupContentWrapperExample = () => {
  const plainContentStyle = {
    zIndex: 1000,
    padding: 5,
  }

  return (
    <>
      <Popup content={<p style={plainContentStyle}>Plain popup content rendered 'as is'.</p>}>
        <Button icon="expand" content="Popup with plain content" />
      </Popup>

      <Popup
        content={{ content: <p style={plainContentStyle}>Popup content rendered in wrapper.</p> }}
      >
        <Button icon="expand" content="Popup with wrapped content" />
      </Popup>
    </>
  )
}

export default PopupContentWrapperExample

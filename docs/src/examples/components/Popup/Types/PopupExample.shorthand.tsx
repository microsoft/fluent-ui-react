import React from 'react'
import { Button, Popup, Dialog } from '@stardust-ui/react'

const PopupExample = () => (
  <>
    <Popup
      trigger={<Button icon="more" />}
      content={{
        content:
          'Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! ',
        style: { overflowY: 'scroll', height: '100px', width: '100px' },
      }}
    />

    <Dialog
      trigger={<Button icon="more" />}
      content={{
        content:
          'Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! Hello from popup! ',
        style: { overflowY: 'scroll', height: '100px', width: '100px' },
      }}
    />
  </>
)
export default PopupExample

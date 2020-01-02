import * as React from 'react'
import { Popup, Button } from '@fluentui/react'

export const selectors = {
  popupContent: Popup.slotClassNames.content,
  button: Button.className,
}

const PopupWithoutTriggerExample = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Popup
        open={open}
        content={{ content: 'Test Content' }}
        onOpenChange={(e, data) => setOpen(data.open)}
      />
      <Button content="Test button" onClick={() => setOpen(!open)} />
    </>
  )
}

export default PopupWithoutTriggerExample

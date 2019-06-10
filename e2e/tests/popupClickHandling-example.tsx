import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

export const selectors = {
  triggerButtonId: 'trigger',
  popupContentClass: Popup.slotClassNames.content,
  popupContentButtonId: 'content-button',
}

const PopupExample = () => {
  const [show, setShow] = React.useState(true)
  return (
    <React.Fragment>
      <Popup
        trigger={
          <Button id={selectors.triggerButtonId} icon="expand" onClick={() => setShow(true)} />
        }
        content={{
          content: !!show && (
            <Button
              id={selectors.popupContentButtonId}
              content="click me"
              onClick={e => {
                e.preventDefault()
                setShow(!show)
              }}
            />
          ),
        }}
      />
    </React.Fragment>
  )
}

export default PopupExample

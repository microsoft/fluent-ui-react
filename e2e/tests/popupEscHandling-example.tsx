import * as React from 'react'
import { Button, Dropdown, Popup } from '@stardust-ui/react'

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange']

export const selectors = {
  popupTriggerId: 'trigger',
  popupContentClass: Popup.slotClassNames.content,
  dropdownTriggerClass: Dropdown.slotClassNames.triggerButton,
}

const PopupEscHandlingExample = () => (
  <Popup
    trigger={<Button id={selectors.popupTriggerId} content="Open popup" style={{ margin: 50 }} />}
    content={
      <>
        <div>Hello from inner popup!</div>

        <Dropdown
          items={inputItems}
          placeholder="Select your hero"
          getA11ySelectionMessage={{
            onAdd: item => `${item} has been selected.`,
          }}
        />
      </>
    }
  />
)

export default PopupEscHandlingExample

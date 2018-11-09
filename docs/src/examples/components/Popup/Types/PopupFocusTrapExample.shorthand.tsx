import React from 'react'
import { Button, Input, Header, Popup } from '@stardust-ui/react'

const PopupFocusTrapExample = () => (
  <>
    <Popup
      trigger={<Button icon="expand" content="Default trap behavior" />}
      content={{ content: <Input icon="search" placeholder="Search..." /> }}
    />

    <Popup
      trigger={<Button icon="expand" content="Lets trap your focus even more ツ" />}
      focusTrap={{
        // When 'false', all clicks outside the Portal will be caught and not handled.
        // 'true' by default.
        isClickableOutsideFocusTrap: false,
        // Allows to pass element which you want to be focused after Portal is closed.
        // 'null' by default, so the trigger element would be focused on close.
        elementToFocusOnDismiss: null,
        // Indicates whether to force focus inside a Portal, if the 'focus' event was invoked at any place.
        // 'false' by default.
        forceFocusInsideTrap: false,
        // Ignore focusing element which activated Portal after it was closed.
        // 'false' by default.
        ignoreExternalFocusing: false,
        // Do not focus first focusable element of Portal when opened.
        // 'false' by default.
        disableFirstFocus: false,
        // Indicates an element to focus after Portal has opened.
        // 'null' by default. The first focusable element of Portal will be focused.
        firstFocusableSelector: null,
      }}
      content={{
        content: (
          <>
            <Header as="h4">This content traps focus on appearance.</Header>
            <p>
              This popup won't close on outside click because of passed focus trap props.<br />
              Use ESC button to close it.
            </p>

            <Input icon="search" placeholder="Search..." />
          </>
        ),
      }}
    />
  </>
)

export default PopupFocusTrapExample

import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default popup."
      examplePath="components/Popup/Types/PopupExample"
    />
    <ComponentExample
      title="Controlled"
      description="Note that if Popup is controlled, then its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChanged' event. Try to type some text into popup's input field and press ESC to see the effect."
      examplePath="components/Popup/Types/PopupControlledExample"
    />
    <ComponentExample
      title="Content Wrapper"
      description="Use 'content' prop of the Popup to set whether Popup content should be rendered with the default wrapper."
      examplePath="components/Popup/Types/PopupContentWrapperExample"
    />
    <ComponentExample
      title="Focus Trap"
      description="Popup content traps focus on appearance by using dedicated accessibility behavior."
      examplePath="components/Popup/Types/PopupFocusTrapExample"
    />
    <ComponentExample
      title="Custom Target"
      description="By default Popup uses trigger element as the one it is displayed for, but it is possible to provide any DOM element as popup's target."
      examplePath="components/Popup/Types/PopupCustomTargetExample"
    />
  </ExampleSection>
)

export default Types

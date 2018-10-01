import React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default popup. Note that Popup is a controlled component, and its 'open' prop value could be changed either by parent component, or by user actions (keypress) - thus it is necessary to handle 'onOpenChanged' event. Try to press space key while button is focused to see the effect."
      examplePath="components/Popup/Types/PopupExample"
    />
  </ExampleSection>
)

export default Types

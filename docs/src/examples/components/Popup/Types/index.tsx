import React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default popup. Note that Popup is a controlled component, and its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChanged' event. Try to type some text into popup's input field and press ESC to see the effect."
      examplePath="components/Popup/Types/PopupExample"
    />
    <ComponentExample
      title="Popup Content"
      description="Use 'content' prop of the Popup to set whether Popup content should be rendered with the default wrapper."
      examplePath="components/Popup/Types/PopupContentExample"
    />
  </ExampleSection>
)

export default Types

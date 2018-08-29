import React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const PopupTypesExamples = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Popup"
      description="A basic popup."
      examplePath="components/Popup/Types/PopupExample"
    />
    <ComponentExample
      title="Popup menu button"
      description="Popup menu button."
      examplePath="components/Popup/Types/PopupMenuButtonExample"
    />
  </ExampleSection>
)

export default PopupTypesExamples

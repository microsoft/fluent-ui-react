import React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Basic"
      description="A basic popup."
      examplePath="components/Popup/Variations/PopupExampleBasic"
    />
    <ComponentExample
      title="Position"
      description="A popup can be position around its trigger."
      examplePath="components/Popup/Variations/PopupExamplePosition"
    />
  </ExampleSection>
)

export default Variations

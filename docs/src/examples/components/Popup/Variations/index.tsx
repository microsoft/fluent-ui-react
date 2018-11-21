import React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Alignment and Position"
      description="A popup can be positioned around its trigger and aligned relative to the trigger's margins. Click on a button to open a popup on a specific position and alignment."
      examplePath="components/Popup/Variations/PopupExamplePosition"
    />
  </ExampleSection>
)

export default Variations

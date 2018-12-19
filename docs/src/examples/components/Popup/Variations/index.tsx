import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Alignment and Position"
      description="A popup can be positioned around its trigger and aligned relative to the trigger's margins. Click on a button to open a popup on a specific position and alignment."
      examplePath="components/Popup/Variations/PopupExamplePosition"
    />
    <ComponentExample
      title="Offset"
      description="Popup position could be further customized by providing offset value. Note that percentage values of both trigger and popup elements' lengths are supported."
      examplePath="components/Popup/Variations/PopupExampleOffset"
    />
  </ExampleSection>
)

export default Variations

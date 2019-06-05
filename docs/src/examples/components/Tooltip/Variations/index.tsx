import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Alignment and Position"
      description="A tooltip can be positioned around its trigger and aligned relative to the trigger's margins. Click on a button to open a tooltip on a specific position and alignment."
      examplePath="components/Tooltip/Variations/TooltipExamplePosition"
    />
    <ComponentExample
      title="Offset"
      description="Tooltip position could be further customized by providing offset value. Note that percentage values of both trigger and tooltip elements' lengths are supported."
      examplePath="components/Tooltip/Variations/TooltipExampleOffset"
    />
  </ExampleSection>
)

export default Variations

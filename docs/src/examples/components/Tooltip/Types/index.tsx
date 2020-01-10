import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default tooltip."
      examplePath="components/Tooltip/Types/TooltipExample"
    />
    <ComponentExample
      title="Pointing"
      description="A tooltip can have a pointer."
      examplePath="components/Tooltip/Types/TooltipExamplePointing"
    />
  </ExampleSection>
)

export default Types

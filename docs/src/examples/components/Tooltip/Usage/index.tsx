import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom Target"
      description="By default Tooltip uses trigger element as the one it is displayed for, but it is possible to provide any DOM element as tooltip's target."
      examplePath="components/Tooltip/Usage/TooltipExampleTarget"
    />
  </ExampleSection>
)

export default Usage

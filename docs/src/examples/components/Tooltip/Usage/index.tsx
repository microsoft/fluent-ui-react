import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Async tooltip position update"
      description="A tooltip can be forced to update its position - this comes in handy in async data loading scenarios."
      examplePath="components/Tooltip/Usage/TooltipExampleAsync"
    />
    <ComponentExample
      title="Nested"
      description="Tooltips can be nested."
      examplePath="components/Tooltip/Usage/TooltipExampleNested"
    />
  </ExampleSection>
)

export default Usage

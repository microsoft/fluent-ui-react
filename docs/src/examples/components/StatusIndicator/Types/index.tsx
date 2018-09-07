import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A status indicator for showing user's status"
      examplePath="components/StatusIndicator/Types/StatusIndicatorExample"
    />
    <ComponentExample
      title="Icon"
      description="A status indicator can have icon"
      examplePath="components/StatusIndicator/Types/StatusIndicatorIconExample"
    />
  </ExampleSection>
)

export default Types

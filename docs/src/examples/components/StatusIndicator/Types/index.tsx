import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A status indicator is for indicating the status of something."
      examplePath="components/StatusIndicator/Types/StatusIndicatorExample"
    />
    <ComponentExample
      title="Status"
      description="A status indicator can indicate various statuses."
      examplePath="components/StatusIndicator/Types/StatusIndicatorStatusExample"
    />
    <ComponentExample
      title="Icon"
      description="A status indicator can have icon."
      examplePath="components/StatusIndicator/Types/StatusIndicatorIconExample"
    />
  </ExampleSection>
)

export default Types

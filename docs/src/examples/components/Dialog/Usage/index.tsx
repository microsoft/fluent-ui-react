import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const DialogUsageExamples = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Callbacks"
      description="A dialog has different callbacks."
      examplePath="components/Dialog/Usage/DialogExampleCallbacks"
    />
    <ComponentExample
      title="Callbacks"
      description="A dialog can be used to show notifications."
      examplePath="components/Dialog/Usage/DialogExampleNotification"
    />
  </ExampleSection>
)

export default DialogUsageExamples

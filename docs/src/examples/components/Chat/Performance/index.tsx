import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Duplicate Messages"
      description="Chat with many duplicate messages."
      examplePath="components/Chat/Performance/ChatDuplicateMessages.perf"
    />
    <ComponentPerfExample
      title="Chat with popover"
      description="Chat with actions menu in a popover."
      examplePath="components/Chat/Performance/ChatWithPopover.perf"
    />
  </ExampleSection>
)

export default Performance

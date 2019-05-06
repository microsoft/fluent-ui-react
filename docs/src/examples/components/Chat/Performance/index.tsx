import * as React from 'react'

import ComponentPerfExample from 'docs/src/components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Chat/Performance/Chat.perf"
    />
    <ComponentPerfExample
      title="Chat with popover"
      description="Chat with actions menu in a popover"
      examplePath="components/Chat/Performance/ChatWithPopover.perf"
    />
  </NonPublicSection>
)

export default Performance

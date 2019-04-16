import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import NonPublicSection from 'docs/src/components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
    <ComponentExample
      title="Default"
      description="A default test."
      examplePath="components/Chat/Performance/Chat.perf"
    />
    <ComponentExample
      title="Chat with popover"
      description="Chat with actions menu in a popover"
      examplePath="components/Chat/Performance/ChatWithPopover.perf"
    />
  </NonPublicSection>
)

export default Performance

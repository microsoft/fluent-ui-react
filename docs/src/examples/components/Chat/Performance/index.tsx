import * as React from 'react'

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample'
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection'

const Performance = () => (
  <NonPublicSection title="Performance">
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
  </NonPublicSection>
)

export default Performance

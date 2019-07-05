import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Triggering context menu on different actions"
      description="A context menu can be triggered on click, hover or focus."
      examplePath="components/ContextMenu/Usage/ContextMenuExampleOn"
    />
  </ExampleSection>
)

export default Usage

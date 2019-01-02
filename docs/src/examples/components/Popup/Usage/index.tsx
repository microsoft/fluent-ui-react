import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Triggering popup on different actions"
      description="A popup can be triggered on click, hover or focus."
      examplePath="components/Popup/Usage/PopupExampleOn"
    />
    <ComponentExample
      title="Combined triggering actions"
      description="The triggering actions can be combined."
      examplePath="components/Popup/Usage/PopupExampleOnMultiple"
    />
  </ExampleSection>
)

export default Usage

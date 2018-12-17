import React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Hover"
      description="A popup can be triggered on hover."
      examplePath="components/Popup/Usage/PopupExampleHover"
    />
    <ComponentExample
      title="Click"
      description="A popup can be triggered on click."
      examplePath="components/Popup/Usage/PopupExampleClick"
    />
  </ExampleSection>
)

export default Usage

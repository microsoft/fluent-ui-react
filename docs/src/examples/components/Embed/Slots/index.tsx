import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="IFrame"
      description="A component can embed any iframe."
      examplePath="components/Embed/Slots/EmbedExampleIframe"
    />
  </ExampleSection>
)

export default Types

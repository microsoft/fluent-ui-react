import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Video"
      description="A basic embedded video."
      examplePath="components/Embed/Slots/EmbedExampleVideo"
    />
    <ComponentExample
      title="IFrame"
      description="An embed component can embed any iframe."
      examplePath="components/Embed/Slots/EmbedExampleIframe"
    />
  </ExampleSection>
)

export default Slots

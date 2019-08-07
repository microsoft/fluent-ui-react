import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Embed"
      description="A basic embedded GIF."
      examplePath="components/Embed/Types/EmbedExample"
    />
    <ComponentExample
      title="IFrame"
      description="An embed component can embed any iframe."
      examplePath="components/Embed/Types/EmbedExampleIframe"
    />
    <ComponentExample
      title="YouTube"
      description="An embed component can embed a YouTube video by iframe."
      examplePath="components/Embed/Types/EmbedExampleYouTube"
    />
  </ExampleSection>
)

export default Types

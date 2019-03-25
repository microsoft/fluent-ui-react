import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Video."
      examplePath="components/Video/Types/VideoExample"
    />
    <ComponentExample
      title="Video gif"
      description="A basic GIF."
      examplePath="components/Video/Types/VideoGifExample"
    />
  </ExampleSection>
)

export default Types

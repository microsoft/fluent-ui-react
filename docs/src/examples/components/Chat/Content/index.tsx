import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Content = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Actions"
      description="A chat message can contain actions."
      examplePath="components/Chat/Content/ChatExampleActions"
    />
  </ExampleSection>
)

export default Content

import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="">
    <ComponentExample
      title="Default"
      description="A default Chat."
      examplePath="components/Chat/Usage/ChatExampleInScrollable"
    />
  </ExampleSection>
)

export default Usage

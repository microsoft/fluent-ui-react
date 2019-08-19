import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Important message"
      description="An Alert that displays an important information."
      examplePath="components/Alert/Usage/AlertExampleImportantMessage"
    />
  </ExampleSection>
)

export default Usage

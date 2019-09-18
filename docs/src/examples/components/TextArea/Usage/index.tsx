import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Max length"
      description="A text area with a limited space."
      examplePath="components/TextArea/Usage/TextAreaMaxLengthExample"
    />
  </ExampleSection>
)

export default Usage

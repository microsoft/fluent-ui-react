import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Maximum character length"
      description="A text area with a limited character length allowed."
      examplePath="components/TextArea/Usage/TextAreaExampleMaxLength"
    />
    <ComponentExample
      title="Custom height"
      description="A text area can have a custom height."
      examplePath="components/TextArea/Usage/TextAreaExampleHeight"
    />
  </ExampleSection>
)

export default Usage

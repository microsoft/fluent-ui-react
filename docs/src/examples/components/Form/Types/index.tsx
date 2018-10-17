import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default form."
      examplePath="components/Form/Types/FormExample"
    />
    <ComponentExample
      title="Inline"
      description="The controls inside a form can appear next to the label instead of below it."
      examplePath="components/Form/Types/FormExampleInline"
    />
  </ExampleSection>
)

export default Types

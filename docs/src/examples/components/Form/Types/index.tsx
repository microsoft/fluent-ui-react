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
      title="Size"
      description="The Form component supports a number of different sizes."
      examplePath="components/Form/Types/FormExampleSize"
    />
  </ExampleSection>
)

export default Types

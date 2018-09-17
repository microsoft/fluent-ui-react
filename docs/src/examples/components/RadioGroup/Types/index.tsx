import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Radio Group"
      description="Multiple radio buttons organized into one radio group."
      examplePath="components/RadioGroup/Types/RadioGroupExample"
    />
    <ComponentExample
      title="Vertical Radio Group"
      description="Multiple radio buttons organized into one vertical radio group."
      examplePath="components/RadioGroup/Types/RadioGroupVerticalExample"
    />
  </ExampleSection>
)

export default Types

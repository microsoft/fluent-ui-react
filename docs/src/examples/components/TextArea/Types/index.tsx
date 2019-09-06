import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Placeholder"
      description="A text area with a placeholder."
      examplePath="components/TextArea/Types/TextAreaExample"
    />
    <ComponentExample
      title="Max length"
      description="A text area with a limited space."
      examplePath="components/TextArea/Types/TextAreaMaxLengthExample"
    />
    <ComponentExample
      title="Disabled"
      description="A text area that is read-only."
      examplePath="components/TextArea/Types/TextAreaDisabledExample"
    />
  </ExampleSection>
)

export default Types

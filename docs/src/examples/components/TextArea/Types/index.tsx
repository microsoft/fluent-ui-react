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
      title="Inverted colors"
      description="A text area can show an inverted background color."
      examplePath="components/TextArea/Types/TextAreaInvertedExample"
    />
  </ExampleSection>
)

export default Types

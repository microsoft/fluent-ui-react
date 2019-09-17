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
      examplePath="components/TextArea/Types/TextAreaExampleInverted"
    />
    <ComponentExample
      title="Fluid"
      description="A text area can take up the entire horizontal space of its parent container."
      examplePath="components/TextArea/Types/TextAreaExampleFluid"
    />
    <ComponentExample
      title="Resize"
      description="A text area can be resized either horizontally, vertically, or in both directions. (Not supported in IE)"
      examplePath="components/TextArea/Types/TextAreaExampleResize"
    />
  </ExampleSection>
)

export default Types

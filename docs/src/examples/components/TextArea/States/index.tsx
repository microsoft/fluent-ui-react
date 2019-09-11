import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A text area that is read-only."
      examplePath="components/TextArea/States/TextAreaDisabledExample"
    />
    <ComponentExample
      title="Value"
      description="A text area with a value."
      examplePath="components/TextArea/States/TextAreaValueExample"
    />
  </ExampleSection>
)

export default States

import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Checked"
      description="A radio can come pre-checked."
      examplePath="components/Radio/States/RadioExampleChecked"
    />
    <ComponentExample
      title="Disabled"
      description="Radios can be disabled."
      examplePath="components/Radio/States/RadioExampleDisabled"
    />
  </ExampleSection>
)

export default States

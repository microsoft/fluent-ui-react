import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A button can show it is currently unable to be interacted with."
      examplePath="components/Button/States/ButtonExampleDisabled"
    />
  </ExampleSection>
)

export default States

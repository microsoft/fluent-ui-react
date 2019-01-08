import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A menu item can be disabled to show it is currently unable to be interacted with."
      examplePath="components/Menu/States/MenuExampleDisabled"
    />
  </ExampleSection>
)

export default States

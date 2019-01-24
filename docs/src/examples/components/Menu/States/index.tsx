import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled menu item"
      description="A menu item can be disabled."
      examplePath="components/Menu/States/MenuItemExampleDisabled"
    />
  </ExampleSection>
)

export default States

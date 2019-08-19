import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Action"
      description="An Alert can provide the user with an action. Click on the icon to see the effect."
      examplePath="components/Alert/Slots/AlertExampleAction"
    />
    <ComponentExample
      title="Icon"
      description="An Alert can contain an icon."
      examplePath="components/Alert/Slots/AlertExampleIcon"
    />
    <ComponentExample
      title="Header"
      description="An Alert can contain a header."
      examplePath="components/Alert/Slots/AlertExampleHeader"
    />
  </ExampleSection>
)

export default Slots

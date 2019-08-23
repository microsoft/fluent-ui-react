import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Dismiss Action"
      description="An Alert can provide the user with an action."
      examplePath="components/Alert/Slots/AlertExampleDismissAction"
    />
    <ComponentExample
      title="Actions"
      description="An Alert can contain action buttons."
      examplePath="components/Alert/Slots/AlertExampleActions"
    />
  </ExampleSection>
)

export default Slots

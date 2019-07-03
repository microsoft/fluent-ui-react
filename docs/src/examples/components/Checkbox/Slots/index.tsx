import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Label"
      description="A checkbox can have a label."
      examplePath="components/Checkbox/Slots/CheckboxExampleLabel"
    />
  </ExampleSection>
)

export default Slots

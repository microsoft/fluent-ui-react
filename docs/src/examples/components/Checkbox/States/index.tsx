import * as React from 'react'

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Checked"
      description="A checkbox can be checked."
      examplePath="components/Checkbox/States/CheckboxExampleChecked"
    />
    <ComponentExample
      title="Disabled"
      description="A checkbox can be read-only and unable to change states."
      examplePath="components/Checkbox/States/CheckboxExampleDisabled"
    />
  </ExampleSection>
)

export default States

import * as React from 'react'

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample'
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Checkbox"
      description="A standard checkbox."
      examplePath="components/Checkbox/Types/CheckboxExample"
    />
    <ComponentExample
      title="Toggle"
      description="A checkbox can be formatted to show an on or off choice."
      examplePath="components/Checkbox/Types/CheckboxExampleToggle"
    />
    <ComponentExample
      title="Multiselect Listbox"
      description="A checkbox can be used in multiselect listbox (selectable List)"
      examplePath="components/Checkbox/Types/CheckboxListboxExample"
    />
  </ExampleSection>
)

export default Types

import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default List."
      examplePath="components/List/Types/ListExample"
    />
    <ComponentExample
      title="Selectable list"
      description="A list can be formatted to indicate that its items can be selected."
      examplePath="components/List/Types/ListExampleSelectable"
    />
    <ComponentExample
      title="Controlled selectable list"
      description="List can handle selected index in controlled mode."
      examplePath="components/List/Types/ListExampleSelectableControlled"
    />
  </ExampleSection>
)

export default Types

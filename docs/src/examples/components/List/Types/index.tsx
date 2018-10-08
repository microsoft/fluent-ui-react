import React from 'react'
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
      title="Selection"
      description="A list can be formatted to indicate that its items can be selected."
      examplePath="components/List/Types/ListExampleSelection"
    />
    <ComponentExample
      title="Selected"
      description="A list can be formatted to indicate that one or more items are selected."
      examplePath="components/List/Types/ListExampleSelected"
    />
  </ExampleSection>
)

export default Types

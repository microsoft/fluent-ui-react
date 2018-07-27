import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Circular"
      description="A label can be circular"
      examplePath="components/Label/Variations/LabelExampleCircular"
    />
    <ComponentExample
      title="On remove"
      description="A label can have removable icon and receive a callback to be invoked on removing"
      examplePath="components/Label/Variations/LabelExampleOnRemove"
    />
    <ComponentExample
      title="Remove icon"
      description="The removable icon can be defined by the user"
      examplePath="components/Label/Variations/LabelExampleRemoveIcon"
    />
  </ExampleSection>
)

export default Variations

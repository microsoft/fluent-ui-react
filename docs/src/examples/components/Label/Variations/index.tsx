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
      title="Icon"
      description="The label can contain an icon"
      examplePath="components/Label/Variations/LabelExampleIcon"
    />
    <ComponentExample
      title="Icon position"
      description="The icon inside the label can be aligned before or after the content"
      examplePath="components/Label/Variations/LabelExampleIconPosition"
    />
    <ComponentExample
      title="Clickable icon"
      description="The icon inside the label can be clickable"
      examplePath="components/Label/Variations/LabelExampleOnIconClick"
    />
    <ComponentExample
      title="The Icon inside Label can be customized"
      description="The Icon component inside the Label can be defined with customizing it's prop"
      examplePath="components/Label/Variations/LabelExampleIconAsShorthand"
    />
    <ComponentExample
      title="Image"
      description="The Label can contain an image"
      examplePath="components/Label/Variations/LabelExampleImage"
    />
  </ExampleSection>
)

export default Variations

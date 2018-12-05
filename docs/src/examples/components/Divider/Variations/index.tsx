import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Color"
      description="A divider can have different colors."
      examplePath="components/Divider/Variations/DividerExampleColor"
    />
    <ComponentExample
      title="Size"
      description="A divider can have different sizes."
      examplePath="components/Divider/Variations/DividerExampleSize"
    />
    <ComponentExample
      title="Important"
      description="A divider can appear more important and draw the user's attention."
      examplePath="components/Divider/Variations/DividerExampleImportant"
    />
    <ComponentExample
      title="Fitted"
      description="A divider can be fitted, without any space above or below it."
      examplePath="components/Divider/Variations/DividerExampleFitted"
    />
  </ExampleSection>
)

export default Variations

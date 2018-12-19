import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Description"
      description="Headers may contain description."
      examplePath="components/Header/Variations/HeaderExampleDescription"
    />
    <ComponentExample
      title="Description customizations"
      description="Descriptions can be customize according to the needs of the user."
      examplePath="components/Header/Variations/HeaderExampleDescriptionCustomization"
    />
    <ComponentExample
      title="TextAlign"
      description="Headers may be aligned to the left, right, center or be justified."
      examplePath="components/Header/Variations/HeaderExampleTextAlign"
    />
    <ComponentExample
      title="Color"
      description="Headers and descriptions can have colors."
      examplePath="components/Header/Variations/HeaderExampleColor"
    />
  </ExampleSection>
)

export default Variations

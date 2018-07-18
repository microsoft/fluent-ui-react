import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Subheader"
      description="Headers may contain subheaders."
      examplePath="components/Header/Variations/HeaderExampleSubheader"
    />
    <ComponentExample
      title="Color"
      description="Headers may have different colors."
      examplePath="components/Header/Variations/HeaderExampleColor"
    />
    <ComponentExample
      title="Background"
      description="Headers may have different background colors."
      examplePath="components/Header/Variations/HeaderExampleBackground"
    />
    <ComponentExample
      title="Subheader color"
      description="The subheaders may have different colors."
      examplePath="components/Header/Variations/HeaderExampleSubheaderColor"
    />
    <ComponentExample
      title="Subheader background"
      description="The subheaders may have different background colors."
      examplePath="components/Header/Variations/HeaderExampleSubheaderBackground"
    />
  </ExampleSection>
)

export default Variations

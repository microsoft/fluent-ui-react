import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Size"
      description="Size variations for the Avatar."
      examplePath="components/Avatar2/Variations/Avatar2ExampleSize"
    />
    <ComponentExample
      title="Status"
      description="The status, or presence state, of the avatar."
      examplePath="components/Avatar2/Variations/Avatar2ExampleStatus"
    />
  </ExampleSection>
)

export default Variations

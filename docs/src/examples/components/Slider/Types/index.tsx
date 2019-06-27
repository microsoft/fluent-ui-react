import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default slider."
      examplePath="components/Slider/Types/SliderExample"
    />
    <ComponentExample
      title="Disabled"
      description="A slider can be read-only and unable to change states."
      examplePath="components/Slider/Types/SliderExampleDisabled"
    />
  </ExampleSection>
)

export default Types

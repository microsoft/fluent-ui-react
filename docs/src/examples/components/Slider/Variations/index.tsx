import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Icon"
      description="A slider can have an icon."
      examplePath="components/Slider/Variations/SliderExampleIcon"
    />
    <ComponentExample
      title="Icon position"
      description="The icon inside the slider can be positioned at the end of the slider."
      examplePath="components/Slider/Variations/SliderExampleIconPosition"
    />
    <ComponentExample
      title="Vertical"
      description="A slider can be displayed vertically."
      examplePath="components/Slider/Variations/SliderExampleVertical"
    />
    <ComponentExample
      title="Fluid"
      description="A slider can take up the width of its container."
      examplePath="components/Slider/Variations/SliderExampleFluid"
    />
  </ExampleSection>
)

export default Variations

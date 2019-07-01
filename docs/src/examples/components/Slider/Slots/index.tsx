import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Icon"
      description="A slider can have an icon that can be positioned at the start or the end of the slider."
      examplePath="components/Slider/Slots/SliderExampleIcon"
    />
  </ExampleSection>
)

export default Slots

import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Slider with action element"
      description="The slider is used together with a button that changes its icon and toggles the slider value when clicked (between current value and minimum value)."
      examplePath="components/Slider/Usage/SliderUsageExample"
    />
  </ExampleSection>
)

export default Usage

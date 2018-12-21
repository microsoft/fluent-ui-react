import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'
import Segment from 'src/components/Segment/Segment'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Radio Group"
      description="Multiple radio buttons organized into one radio group."
      examplePath="components/RadioGroup/Types/RadioGroupExample"
    >
      <Segment style={{ marginTop: '10px' }}>
        It is possible to use Shorthand API when defining items, however it is not possible to
        create an item from just a string.
      </Segment>
    </ComponentExample>
    <ComponentExample
      title="Vertical Radio Group"
      description="Multiple radio buttons organized into one vertical radio group."
      examplePath="components/RadioGroup/Types/RadioGroupVerticalExample"
    />
    <ComponentExample
      title="Color Picker"
      description="Radio group used as a color picker."
      examplePath="components/RadioGroup/Types/RadioGroupColorPickerExample"
    />
  </ExampleSection>
)

export default Types

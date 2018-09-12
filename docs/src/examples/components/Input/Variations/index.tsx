import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Icon"
      description="An input can have an icon."
      examplePath="components/Input/Variations/InputExampleIcon"
    />
    <ComponentExample
      title="Fluid"
      description="An input can take the full width of the parent element."
      examplePath="components/Input/Variations/InputExampleFluid"
    />
    <ComponentExample
      title="Clearable"
      description="An input can be clearable."
      examplePath="components/Input/Variations/InputExampleClearable"
    />
    <ComponentExample
      title="Clearable with icon"
      description="An input with a given icon can be clearable (the given icon will change into clear button on typing)."
      examplePath="components/Input/Variations/InputExampleIconClearable"
    />
    <ComponentExample
      title="Inline"
      description="An input can be used inline with text."
      examplePath="components/Input/Variations/InputExampleInline"
    />
  </ExampleSection>
)

export default Variations

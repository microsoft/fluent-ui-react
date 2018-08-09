import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Label"
      description="A label."
      examplePath="components/Label/Content/LabelExample"
    />
    <ComponentExample
      title="Start"
      description="A label can contain media displayed at the start of it."
      examplePath="components/Label/Content/LabelExampleStart"
    />
    <ComponentExample
      title="End"
      description="A label can contain media displayed at the start of it."
      examplePath="components/Label/Content/LabelExampleEnd"
    />
    <ComponentExample
      title="Start & End"
      description="A label can contain media displayed both on the start and end end."
      examplePath="components/Label/Content/LabelExampleStartEnd"
    />
  </ExampleSection>
)

export default Content

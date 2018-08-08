import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Content"
      description="A label can contain content."
      examplePath="components/Label/Content/LabelExampleContent"
    />
    <ComponentExample
      title="Start media"
      description="A label can contain start media."
      examplePath="components/Label/Content/LabelExampleStartMedia"
    />
    <ComponentExample
      title="End media"
      description="A label can contain end media."
      examplePath="components/Label/Content/LabelExampleEndMedia"
    />
    <ComponentExample
      title="Start & End media"
      description="A label can contain start and end media."
      examplePath="components/Label/Content/LabelExampleStartEndMedia"
    />
  </ExampleSection>
)

export default Content

import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Divider"
      description="A menu can have divider between some items."
      examplePath="components/Menu/Content/MenuExampleDivider"
    />
  </ExampleSection>
)

export default Content

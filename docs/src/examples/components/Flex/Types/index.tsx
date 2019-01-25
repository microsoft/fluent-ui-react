import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Media Card"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexMediaCardExample"
    />
    <ComponentExample
      title="Input"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexExampleInput"
    />
    <ComponentExample
      title="Nav Menu"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexExampleNavMenu"
    />
    <ComponentExample
      title="Items Alignment"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexItemsAlignmentOptionsExample"
    />
    <ComponentExample
      title="Mixed Alignment"
      description="Flex mixed alignment feature."
      examplePath="components/Flex/Types/FlexMixedAlignmentExample"
    />
    <ComponentExample
      title="Columns (item size)"
      description="Flex columns example."
      examplePath="components/Flex/Types/FlexColumnsExample"
    />
  </ExampleSection>
)

export default Types

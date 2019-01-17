import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Horizontal"
      description="A layout arranges content into areas."
      examplePath="components/Flex/Types/FlexExample"
    />
    <ComponentExample
      title="Vertical page layout"
      description="A layout can display its areas vertically."
      examplePath="components/Flex/Types/FlexExampleVertical"
    />
    <ComponentExample
      title="Contact card"
      description="A user contact card with actions"
      examplePath="components/Flex/Types/FlexContactCard"
    />
    <ComponentExample
      title="Flex model"
      description="A flex model."
      examplePath="components/Flex/Types/FlexExampleModel"
    />
    <ComponentExample
      title="Stock Card"
      description="Taken from https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1NYF16StsewtmGh_4xoAuq_rRtEx15_-s%2Ftabs-placement-02b.png"
      examplePath="components/Flex/Types/FlexExampleStockCard"
    />
  </ExampleSection>
)

export default Types

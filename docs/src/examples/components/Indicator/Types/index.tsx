import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Indicator ."
      examplePath="components/Indicator/Types/IndicatorExample"
    />
    <ComponentExample
      title="Direction"
      description="An Indicator may show towards different direction."
      examplePath="components/Indicator/Types/IndicatorExampleDirection"
    />
    <ComponentExample
      title="Icon"
      description="An Indicator may show icon instead of character."
      examplePath="components/Indicator/Types/IndicatorExampleIcon"
    />
  </ExampleSection>
)

export default Types

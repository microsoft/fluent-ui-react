import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Tinted Example"
      description='A button used in cards is a "tinted" version of a default button.'
      examplePath="components/Button/Usage/ButtonUsageExample"
    />
  </ExampleSection>
)

export default Usage

import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Tinted Example"
      description="A button used in cards is a &quot;tinted&quot; version of a default button."
      examplePath="components/Button/Usage/ButtonUsageExample"
    />
    <ComponentExample
      title="Toolbar button"
      description="Icon paths change on hover"
      examplePath="components/Button/Usage/ButtonExampleToolbarButton"
    />
  </ExampleSection>
)

export default Usage

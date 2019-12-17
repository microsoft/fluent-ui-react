import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const SplitButton = () => (
  <ExampleSection title="Split Button">
    <ComponentExample
      title="Split Button"
      description="Buttons can be split into action and toggle."
      examplePath="components/SplitButton/Types/SplitButtonExample"
    />
    <ComponentExample
      title="Emphasis"
      description="A SplitButton can be formatted to show primary level of emphasis."
      examplePath="components/SplitButton/Types/SplitButtonExamplePrimary"
    />
    <ComponentExample
      title="Small"
      description="small splitbutton"
      examplePath="components/SplitButton/Types/SplitButtonExampleSmall"
    />
  </ExampleSection>
)

export default SplitButton

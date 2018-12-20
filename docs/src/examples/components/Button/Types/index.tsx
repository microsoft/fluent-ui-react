import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default button."
      examplePath="components/Button/Types/ButtonExample"
    />
    <ComponentExample
      title="Emphasis"
      description="A button can be formatted to show different levels of emphasis."
      examplePath="components/Button/Types/ButtonExampleEmphasis"
    />
    <ComponentExample
      title="Icon"
      description="A button can be made of only an icon."
      examplePath="components/Button/Types/ButtonExampleIcon"
    />
    <ComponentExample
      title="Icon Only"
      description="A button can be formatted differently if it indicate that it contains only an icon."
      examplePath="components/Button/Types/ButtonExampleIconOnly"
    />
    <ComponentExample
      title="Content and Icon"
      description="A button can have an icon in addition to content."
      examplePath="components/Button/Types/ButtonExampleContentAndIcon"
    />
  </ExampleSection>
)

export default Types

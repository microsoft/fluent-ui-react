import * as React from 'react'
import { Link } from 'react-router-dom'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Content and Icon"
      description="A button can have an icon in addition to content."
      examplePath="components/Button/Usage/ButtonExampleContentAndIcon"
    />
    <ComponentExample
      title="Overflow"
      description="A button can have content that overflows."
      examplePath="components/Button/Usage/ButtonExampleOverflow"
    />
    <ComponentExample
      title="Tinted Example"
      description='A button used in cards is a "tinted" version of a default button.'
      examplePath="components/Button/Usage/ButtonUsageExample"
    />
    <ComponentExample
      title="With tooltip"
      description={
        <>
          {'The button, as actionable element, should be rendered with '}
          <Link to="/components/tooltip">tooltip</Link>
        </>
      }
      examplePath="components/Button/Usage/ButtonExampleWithTooltip"
    />
  </ExampleSection>
)

export default Usage

import * as React from 'react'

import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Triggering menu on different actions"
      description="A context menu can be triggered on click, hover or focus."
      examplePath="components/MenuButton/Usage/MenuButtonExampleOn"
    />
    <ComponentExample
      title="Context menu"
      description="A menu button can be attached to any element to create a context menu."
      examplePath="components/MenuButton/Usage/MenuButtonExampleOnElement"
    />
    <ComponentExample
      title="Controlled"
      description="Note that if MenuButton is controlled, then its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChange' event."
      examplePath="components/MenuButton/Usage/MenuButtonExampleControlled"
    />
  </ExampleSection>
)

export default Usage

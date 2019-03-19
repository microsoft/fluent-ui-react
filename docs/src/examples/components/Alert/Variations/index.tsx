import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Info"
      description="An alert may be formatted to display information."
      examplePath="components/Alert/Variations/AlertExampleInfo"
    />
    <ComponentExample
      title="Warning"
      description="An alert may be formatted to display a warning message."
      examplePath="components/Alert/Variations/AlertExampleWarning"
    />
    <ComponentExample
      title="Success"
      description="An alert may be formatted to display a successful message."
      examplePath="components/Alert/Variations/AlertExampleSuccess"
    />
    <ComponentExample
      title="Danger"
      description="An alert may be formatted to display a danger message."
      examplePath="components/Alert/Variations/AlertExampleDanger"
    />
    <ComponentExample
      title="Attached"
      description="An Alert can be can be formatted to attach itself to other content."
      examplePath="components/Alert/Variations/AlertExampleAttached"
    />
    <ComponentExample
      title="Action"
      description="An Alert can provide the user with an action. Click on the icon to see the effect."
      examplePath="components/Alert/Variations/AlertExampleAction"
    />
  </ExampleSection>
)

export default Variations

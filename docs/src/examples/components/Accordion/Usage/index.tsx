import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Custom panel title"
      description="Accordion panel's title can be customized."
      examplePath="components/Accordion/Usage/AccordionPanelCustomTitleExample"
    />
    <ComponentExample
      title="Custom panel content"
      description="Accordion panel's content can be customized."
      examplePath="components/Accordion/Usage/AccordionPanelCustomContentExample"
    />
  </UsageSection>
)

export default Usage

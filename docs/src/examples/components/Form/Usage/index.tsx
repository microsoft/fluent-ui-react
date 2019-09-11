import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import UsageSection from 'docs/src/components/ComponentDoc/UsageSection'

const Usage = () => (
  <UsageSection>
    <ComponentExample
      title="Checkbox"
      description="A form can have a Checkbox as a field."
      examplePath="components/Form/Usage/FormExampleCheckbox"
    />
    <ComponentExample
      title="Dropdown"
      description="A form can have a Dropdown as a field."
      examplePath="components/Form/Usage/FormExampleDropdown"
    />
    <ComponentExample
      title="Slider"
      description="A form can have a Slider as a field."
      examplePath="components/Form/Usage/FormExampleSlider"
    />
  </UsageSection>
)

export default Usage

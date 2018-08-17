import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Pills"
      description="A menu can adjust its appearance to de-emphasize its contents."
      examplePath="components/Menu/Variations/MenuExamplePills"
    />
    <ComponentExample
      title="Pills Vertical"
      description="A vertical variant of Pills menu."
      examplePath="components/Menu/Variations/MenuExamplePillsVertical"
    />
    <ComponentExample
      title="Pills Primary"
      description="A menu can adjust its appearance to de-emphasize its contents."
      examplePath="components/Menu/Variations/MenuExamplePillsPrimary"
    />
    <ComponentExample
      title="Pills Primary Vertical"
      description="A vertical variant of Pills Primary menu."
      examplePath="components/Menu/Variations/MenuExamplePillsPrimaryVertical"
    />
    <ComponentExample
      title="Pointing"
      description="A menu can point to show its relationship to nearby content."
      examplePath="components/Menu/Variations/MenuExamplePointing"
    />
    <ComponentExample
      title="Pointing Primary"
      description="A menu can point to show its relationship to nearby content."
      examplePath="components/Menu/Variations/MenuExamplePointingPrimary"
    />
    <ComponentExample
      title="Underlined"
      description="A menu can underline the active element."
      examplePath="components/Menu/Variations/MenuExampleUnderlined"
    />
    <ComponentExample
      title="Underlined primary"
      description="A menu can underline the active element."
      examplePath="components/Menu/Variations/MenuExampleUnderlinedPrimary"
    />
    <ComponentExample
      title="Fluid"
      description="A vertical menu may take the size of its container."
      examplePath="components/Menu/Variations/MenuExampleVerticalFluid"
    />
    <ComponentExample
      title="Icon"
      description="Menu items can contain icons."
      examplePath="components/Menu/Variations/MenuExampleWithIcons"
    />
    <ComponentExample
      title="Vertical Icon"
      description="Vertical menu items can contain icons."
      examplePath="components/Menu/Variations/MenuExampleWithIconsVertical"
    />
    <ComponentExample
      title="Icon Only"
      description="Menu can contain only icons."
      examplePath="components/Menu/Variations/MenuExampleIconOnly"
    />
    <ComponentExample
      title="Vertical Icon Only"
      description="Vertical menu can contain only icons."
      examplePath="components/Menu/Variations/MenuExampleIconOnlyVertical"
    />
  </ExampleSection>
)

export default Variations

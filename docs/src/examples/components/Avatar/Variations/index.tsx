import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Image"
      description="An Avatar can show the image of the user."
      examplePath="components/Avatar/Variations/AvatarExampleSrc"
    />
    <ComponentExample
      title="Alt"
      description="The alternative text for the image used in the Avatar."
      examplePath="components/Avatar/Variations/AvatarExampleAlt"
    />
    <ComponentExample
      title="Status"
      description="An Avatar can have a status icon showing his status."
      examplePath="components/Avatar/Variations/AvatarExampleStatus"
    />
    <ComponentExample
      title="Name"
      description="An Avatar can have initials shown from the name prop, if no image is provided."
      examplePath="components/Avatar/Variations/AvatarExampleName"
    />
    <ComponentExample
      title="Excluded Initials"
      description="Avatar initials exclude content in parens, braces, and brackets, as well as all middle names."
      examplePath="components/Avatar/Variations/AvatarExampleExcludedInitials"
    />
    <ComponentExample
      title="Get initials"
      description="An Avatar can be provided with custom logic for generating the initials shown in the label."
      examplePath="components/Avatar/Variations/AvatarExampleGetInitials"
    />
    <ComponentExample
      title="Status customization"
      description="The status inside the Avatar can be customize to show different background."
      examplePath="components/Avatar/Variations/AvatarExampleStatusCustomization"
    />
    <ComponentExample
      title="Size"
      description="An Avatar can have different sizes."
      examplePath="components/Avatar/Variations/AvatarExampleSize"
    />
  </ExampleSection>
)

export default Variations

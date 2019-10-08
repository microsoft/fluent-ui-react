import * as React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Cyclical"
      description="A Carousel's items navigation can be cyclical."
      examplePath="components/Carousel/Variations/CarouselCyclicalExample"
    />
  </ExampleSection>
)

export default Variations

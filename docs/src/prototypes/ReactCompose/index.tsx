import * as React from 'react'
import { SliderExamples } from './Slider'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'

export default () => (
  <PrototypeSection title="ReactCompose">
    <ComponentPrototype title="Slider" description="Slider built with composition.">
      <SliderExamples />
    </ComponentPrototype>
  </PrototypeSection>
)

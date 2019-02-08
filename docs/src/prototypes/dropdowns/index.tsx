import * as React from 'react'
import { PrototypeSection, ComponentPrototype } from '../Protoypes'
import AsyncDropdownSearch from './AsyncDropdownSearch'

export default () => (
  <PrototypeSection title="Dropdowns">
    <ComponentPrototype
      title="Async Dropdown Search"
      description="Use the field to perform a simulated search."
      children={<AsyncDropdownSearch />}
    />
  </PrototypeSection>
)

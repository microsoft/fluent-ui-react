import * as React from 'react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import AsyncDropdownSearch from './AsyncDropdownSearch'
import InputWithDropdown from './InputWithDropdown'

export default () => (
  <PrototypeSection title="Dropdowns">
    <ComponentPrototype
      title="Async Dropdown Search"
      description="Use the field to perform a simulated search."
    >
      <AsyncDropdownSearch />
    </ComponentPrototype>
    <ComponentPrototype
      title="Input with Dropdown"
      description="Use the '@' key to mention people."
    >
      <InputWithDropdown />
    </ComponentPrototype>
  </PrototypeSection>
)

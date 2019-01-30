import * as React from 'react'
import { Dropdown } from '@stardust-ui/react'

const inputItems = [
  'Bruce Wayne',
  'Natasha Romanoff',
  'Steven Strange',
  'Alfred Pennyworth',
  `Scarlett O'Hara`,
  'Imperator Furiosa',
  'Bruce Banner',
  'Peter Parker',
  'Selina Kyle',
]

const DropdownExample = () => (
  <Dropdown
    getA11ySelectionMessage={{
      onAdd: item => `${item} has been selected.`,
    }}
    placeholder="Select your hero"
    items={inputItems}
  />
)

export default DropdownExample

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

const DropdownExampleSingleSelection = () => (
  <Dropdown
    items={inputItems}
    placeholder="Select your hero"
    getA11ySelectionMessage={{ onAdd: item => `${item} has been selected.` }}
  />
)

export default DropdownExampleSingleSelection

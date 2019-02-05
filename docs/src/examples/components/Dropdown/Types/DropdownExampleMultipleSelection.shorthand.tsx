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

const DropdownExampleMultipleSelection = () => (
  <Dropdown
    multiple
    items={inputItems}
    placeholder="Select your heroes"
    noResultsMessage="We couldn't find any matches."
  />
)

export default DropdownExampleMultipleSelection

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

const DropdownExampleSearchMultiple = () => (
  <Dropdown
    search
    multiple
    items={inputItems}
    placeholder="Start typing a name"
    noResultsMessage="We couldn't find any matches."
  />
)

export default DropdownExampleSearchMultiple

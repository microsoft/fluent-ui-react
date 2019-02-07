import * as React from 'react'
import { Dropdown, Header } from '@stardust-ui/react'

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

const DropdownExampleSearch = () => (
  <>
    <Header as="h3">Single Search:</Header>
    <Dropdown
      search
      items={inputItems}
      placeholder="Start typing a name"
      noResultsMessage="We couldn't find any matches."
    />
    <Header as="h3">Multiple Search:</Header>
    <Dropdown
      search
      multiple
      items={inputItems}
      placeholder="Start typing a name"
      noResultsMessage="We couldn't find any matches."
    />
  </>
)

export default DropdownExampleSearch

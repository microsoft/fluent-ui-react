import { Dropdown, Flex } from '@stardust-ui/react'
import * as React from 'react'

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

const DropdownClearableExample = () => (
  <Flex column gap="gap.medium">
    <Dropdown clearable items={inputItems} placeholder="Select your hero" />
    <Dropdown
      clearable
      items={inputItems}
      noResultsMessage="We couldn't find any matches."
      placeholder="Select your hero"
      search
    />
  </Flex>
)

export default DropdownClearableExample

import { Dropdown } from '@stardust-ui/react'
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

const DropdownExampleLoading: React.FC<{ knobs: { loading: boolean } }> = ({ knobs }) => (
  <Dropdown
    loading={knobs.loading}
    multiple
    items={inputItems}
    placeholder="Start typing a name"
    search
  />
)

export default DropdownExampleLoading

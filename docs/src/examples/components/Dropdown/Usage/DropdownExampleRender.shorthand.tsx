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

const DropdownExampleRender: React.FC = () => (
  <Dropdown
    items={inputItems}
    multiple
    placeholder="Start typing a name"
    renderItem={(Item: typeof Dropdown.Item, props) => (
      <Item {...props} header={`${props.header} (active)`} />
    )}
    renderSelectedItem={(SelectedItem: typeof Dropdown.SelectedItem, props) => (
      <SelectedItem {...props} header={`${props.header} (selected)`} />
    )}
    search
  />
)

export default DropdownExampleRender

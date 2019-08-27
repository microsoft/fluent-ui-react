import * as React from 'react'
import { Dropdown, Button } from '@stardust-ui/react'

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
    items={inputItems}
    placeholder="Select your hero"
    checkable
    getA11ySelectionMessage={{ onAdd: item => `${item} has been selected.` }}
    renderSelectedItem={(button: typeof Button, props) => (
      <Button {...props} content={`${props.content} (selected)`} />
    )}
  />
)

export default DropdownExample

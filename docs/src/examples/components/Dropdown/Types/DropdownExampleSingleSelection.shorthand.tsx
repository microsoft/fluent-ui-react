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
    getA11yStatusMessage={getA11yStatusMessage}
    getA11ySelectionMessage={{
      onAdd: item => `${item} has been selected.`,
    }}
    placeholder="Select your hero"
    items={inputItems}
  />
)

const getA11yStatusMessage = ({
  isOpen,
  itemToString,
  previousResultCount,
  resultCount,
  selectedItem,
}) => {
  if (!isOpen) {
    return selectedItem ? itemToString(selectedItem) : ''
  }
  if (!resultCount) {
    return 'No results are available.'
  }
  if (resultCount !== previousResultCount) {
    return `${resultCount} result${
      resultCount === 1 ? ' is' : 's are'
    } available, use up and down arrow keys to navigate. Press Enter key to select.`
  }
  return ''
}

export default DropdownExample

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

const DropdownExampleSearchMultipleFluid = () => (
  <Dropdown
    multiple
    search
    fluid
    items={inputItems}
    placeholder="Start typing a name"
    getA11yStatusMessage={getA11yStatusMessage}
    getA11ySelectionMessage={getA11ySelectionMessage}
    noResultsMessage="We couldn't find any matches."
  />
)

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
}

const getA11yStatusMessage = ({
  isOpen,
  selectedItem,
  resultCount,
  previousResultCount,
  itemToString,
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
    } available, use up and down arrow keys to navigate. Press Enter key to select. Press left and right arrow keys to navigate through the selected options.`
  }
  return ''
}

export default DropdownExampleSearchMultipleFluid

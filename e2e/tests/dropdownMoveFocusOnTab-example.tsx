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

const DropdownExampleMultiple = () => (
  <>
    <button id="previous-button" />
    <Dropdown
      multiple
      moveFocusOnTab
      items={inputItems}
      placeholder="Select your heroes"
      getA11ySelectionMessage={getA11ySelectionMessage}
      noResultsMessage="We couldn't find any matches."
    />
    <button id="next-button" />
  </>
)

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
}

export default DropdownExampleMultiple

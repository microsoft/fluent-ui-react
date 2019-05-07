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

let buttonRef: HTMLElement
let containerRef: HTMLElement
let allowEscPropagation: boolean = false

const setButtonRef = (ref: any) => {
  const dropdownRef = ref
  // buttonRef is private prop, find a way to focus trigger
  buttonRef = dropdownRef && dropdownRef.buttonRef.current
}

const setContainerRef = (ref: HTMLElement) => {
  containerRef = ref
}

export const renderDropdown = () => (
  <div
    data-is-focusable="true"
    onKeyDown={e => {
      if (e.keyCode === 13) {
        // Enter, focus dropdown
        buttonRef && buttonRef.focus()
      }

      if (e.keyCode === 27) {
        // Escape, focus container back
        containerRef && containerRef.focus()
      }
    }}
    ref={setContainerRef}
  >
    Wrapper around Dropdown
    <Dropdown
      multiple
      items={inputItems}
      placeholder="Select your heroes"
      getA11ySelectionMessage={getA11ySelectionMessage}
      noResultsMessage="We couldn't find any matches."
      onKeyDown={e => {
        if (allowEscPropagation && e.keyCode === 27) {
          // Escape, propagate to container
          return
        }
        e.stopPropagation()
      }}
      ref={setButtonRef}
      onOpenChange={(e, props) => {
        const { open } = props
        if (open) {
          allowEscPropagation = false
        } else {
          allowEscPropagation = true
        }
      }}
    />
  </div>
)

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
}

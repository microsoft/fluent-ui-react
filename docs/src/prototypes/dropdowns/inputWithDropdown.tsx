import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import keyboardKey from 'keyboard-key'
import { Dropdown, DropdownProps, Input } from '@stardust-ui/react'

import { atMentionItems, AtMention } from './dataMocks'
import { insertNodeAtCursorPosition, removeElement } from './utils'

interface InputWithDropdownState {
  dropdownOpen?: boolean
  dropdownValue?: string
  searchQuery?: string
}

class InputWithDropdownExample extends React.Component<{}, InputWithDropdownState> {
  private readonly mountNodeId = 'dropdown-mount-node'
  private readonly dropdownInputSelector = `#${this.mountNodeId} .${Input.slotClassNames.input}`
  private readonly editorStyle: React.CSSProperties = {
    backgroundColor: 'lightgrey',
    padding: '5px',
    minHeight: '100px',
    outline: 0,
  }

  private contendEditableRef = React.createRef<HTMLDivElement>()

  public state: InputWithDropdownState = {
    dropdownOpen: false,
    dropdownValue: null,
    searchQuery: '',
  }

  render() {
    return (
      <>
        <div
          contentEditable
          ref={this.contendEditableRef}
          onKeyUp={this.handleEditorKeyUp}
          style={this.editorStyle}
        />
        {this.renderDropdown()}
      </>
    )
  }

  private renderDropdown = () => {
    if (!this.state.dropdownOpen) {
      return null
    }

    insertNodeAtCursorPosition({ id: this.mountNodeId })
    const node = this.getMountNode()

    if (!node) {
      return null
    }

    return ReactDOM.createPortal(
      <Dropdown
        defaultOpen={true}
        inline
        search
        items={atMentionItems}
        toggleIndicator={null}
        searchInput={{
          input: { autoFocus: true },
          onInputKeyDown: this.handleInputKeyDown,
        }}
        onSelectedChange={this.handleSelectedChange}
        onSearchQueryChange={this.handleSearchQueryChange}
        noResultsMessage="We couldn't find any matches."
      />,
      node,
    )
  }

  private hideDropdownAndRestoreEditor = () => {
    removeElement(this.getMountNode())

    this.tryFocusEditor()
    this.setState({ dropdownOpen: false })
  }

  private handleEditorKeyUp = (e: React.KeyboardEvent) => {
    if (!this.state.dropdownOpen && keyboardKey.getCode(e) === keyboardKey.AtSign) {
      this.setState({ dropdownOpen: true })
      this.setInputElementSize(0)
    }
  }

  private handleSelectedChange = (
    e: React.SyntheticEvent,
    { searchQuery, value }: DropdownProps,
  ) => {
    const dropdownValue = (value as AtMention).header
    this.hideDropdownAndRestoreEditor()
    insertNodeAtCursorPosition({ text: dropdownValue })

    this.setState({ searchQuery, dropdownValue })
  }

  private handleSearchQueryChange = (e: React.SyntheticEvent, { searchQuery }: DropdownProps) => {
    this.setInputElementSize(searchQuery.length)
    this.setState({ searchQuery })
  }

  private handleInputKeyDown = (e: React.KeyboardEvent) => {
    const code = keyboardKey.getCode(e)
    switch (code) {
      case keyboardKey.Backspace: // 8
        if (this.state.searchQuery === '') {
          this.hideDropdownAndRestoreEditor()
        }
        break
      case keyboardKey.Escape: // 27
        this.hideDropdownAndRestoreEditor()
        break
    }
  }

  private tryFocusEditor = () => {
    if (this.contendEditableRef) {
      this.contendEditableRef.current.focus()
    }
  }

  private getMountNode = () => document.getElementById(this.mountNodeId)

  private getInputElement = (): HTMLInputElement =>
    document.querySelector(this.dropdownInputSelector)

  private setInputElementSize = (size: number) => {
    const input = this.getInputElement()
    if (input) {
      input.size = size || 0 + 1
      console.log('setInputElementSize: ', input.size)
    }
  }
}

export default InputWithDropdownExample

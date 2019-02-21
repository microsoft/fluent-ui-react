import * as React from 'react'
import * as _ from 'lodash'
import keyboardKey from 'keyboard-key'
import { Dropdown, DropdownProps } from '@stardust-ui/react'

import { atMentionItems, AtMentionItem } from './dataMocks'
import { insertTextAtCursorPosition } from './utils'
import { CustomPortal } from './CustomPortal'

interface MentionsWithDropdownState {
  dropdownOpen?: boolean
  searchQuery?: string
}

const editorStyle: React.CSSProperties = {
  backgroundColor: 'lightgrey',
  padding: '5px',
  minHeight: '100px',
  outline: 0,
}

class MentionsWithDropdown extends React.Component<{}, MentionsWithDropdownState> {
  private readonly initialState: MentionsWithDropdownState = {
    dropdownOpen: false,
    searchQuery: '',
  }

  private contendEditableRef = React.createRef<HTMLDivElement>()

  state = this.initialState

  render() {
    const { dropdownOpen, searchQuery } = this.state

    return (
      <>
        <div
          contentEditable
          ref={this.contendEditableRef}
          onKeyUp={this.handleEditorKeyUp}
          style={editorStyle}
        />
        <CustomPortal mountNodeId="dropdown-mount-node" open={dropdownOpen}>
          <Dropdown
            defaultOpen={true}
            inline
            search
            items={atMentionItems}
            toggleIndicator={null}
            searchInput={{
              input: { autoFocus: true, size: searchQuery.length + 1 },
              onInputKeyDown: this.handleInputKeyDown,
            }}
            onSelectedChange={this.handleSelectedChange}
            onSearchQueryChange={this.handleSearchQueryChange}
            noResultsMessage="We couldn't find any matches."
          />
        </CustomPortal>
      </>
    )
  }

  private hideDropdownAndRestoreEditor = (cb?: () => void) => {
    this.setState(this.initialState, () => {
      this.tryFocusEditor()
      cb && cb()
    })
  }

  private handleEditorKeyUp = (e: React.KeyboardEvent) => {
    if (!this.state.dropdownOpen && keyboardKey.getCode(e) === keyboardKey.AtSign) {
      this.setState({ dropdownOpen: true })
    }
  }

  private handleSelectedChange = (e: React.SyntheticEvent, { value }: DropdownProps) => {
    this.hideDropdownAndRestoreEditor(() => {
      insertTextAtCursorPosition((value as AtMentionItem).header)
    })
  }

  private handleSearchQueryChange = (e: React.SyntheticEvent, { searchQuery }: DropdownProps) => {
    this.setState({ searchQuery })
  }

  private handleInputKeyDown = (e: React.KeyboardEvent) => {
    const keyCode = keyboardKey.getCode(e)
    switch (keyCode) {
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

  private tryFocusEditor = () => _.invoke(this.contendEditableRef.current, 'focus')
}

export default MentionsWithDropdown

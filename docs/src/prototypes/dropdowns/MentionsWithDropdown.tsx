import * as React from 'react'
import * as _ from 'lodash'
import keyboardKey from 'keyboard-key'
import { Dropdown, DropdownProps } from '@stardust-ui/react'

import { atMentionItems } from './dataMocks'
import { insertTextAtCursorPosition } from './utils'
import { PortalAtCursorPosition } from './PortalAtCursorPosition'

interface MentionsWithDropdownState {
  dropdownOpen?: boolean
  searchQuery?: string
}

const editorStyle: React.CSSProperties = {
  backgroundColor: '#eee',
  borderRadius: '5px',
  border: '1px dashed grey',
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
        <PortalAtCursorPosition open={dropdownOpen}>
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
            onOpenChange={this.handleOpenChange}
            onSearchQueryChange={this.handleSearchQueryChange}
            noResultsMessage="We couldn't find any matches."
          />
        </PortalAtCursorPosition>
      </>
    )
  }

  private handleEditorKeyUp = (e: React.KeyboardEvent) => {
    if (!this.state.dropdownOpen && e.shiftKey && keyboardKey.getCode(e) === keyboardKey.AtSign) {
      this.setState({ dropdownOpen: true })
    }
  }

  private handleOpenChange = (e: React.SyntheticEvent, { open }: DropdownProps) => {
    if (!open) {
      this.resetStateAndUpdateEditor()
    }
  }

  private handleSearchQueryChange = (e: React.SyntheticEvent, { searchQuery }: DropdownProps) => {
    this.setState({ searchQuery })
  }

  private handleInputKeyDown = (e: React.KeyboardEvent) => {
    const keyCode = keyboardKey.getCode(e)
    switch (keyCode) {
      case keyboardKey.Backspace: // 8
        if (this.state.searchQuery === '') {
          this.resetStateAndUpdateEditor()
        }
        break
      case keyboardKey.Escape: // 27
        this.resetStateAndUpdateEditor()
        break
    }
  }

  private resetStateAndUpdateEditor = () => {
    const { searchQuery, dropdownOpen } = this.state

    if (dropdownOpen) {
      this.setState(this.initialState, () => {
        this.tryFocusEditor()

        // after the dropdown is closed the value of the search query is inserted in the editor at cursor position
        insertTextAtCursorPosition(searchQuery)
      })
    }
  }

  private tryFocusEditor = () => _.invoke(this.contendEditableRef.current, 'focus')
}

export default MentionsWithDropdown

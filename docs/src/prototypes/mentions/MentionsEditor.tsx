import * as React from 'react'
import * as _ from 'lodash'
import keyboardKey from 'keyboard-key'

import { atMentionItems, AtMentionItem } from './dataMocks'
import { insertTextAtCursorPosition } from './utils'
import { PortalAtCursorPosition } from './PortalAtCursorPosition'

export interface MentionsContainerProps {
  items?: AtMentionItem[]
  searchQuery?: string
  open?: boolean
  onInputKeyDown?: (e: React.KeyboardEvent) => void
  onOpenChange?: (e: React.SyntheticEvent, data: { open?: boolean }) => void
  onSearchQueryChange?: (e: React.SyntheticEvent, data: { searchQuery: string }) => void
  onSelectedChange?: (e: React.SyntheticEvent, data: { searchQuery: string }) => void
}

interface MentionsEditorState {
  open?: boolean
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

const withMentionsEditor = <P extends MentionsContainerProps = MentionsContainerProps>(
  MentionsContainerComponent: React.ComponentType<MentionsContainerProps>,
) =>
  class extends React.Component<P, MentionsEditorState> {
    private readonly initialState: MentionsEditorState = {
      open: false,
      searchQuery: '',
    }

    private contendEditableRef = React.createRef<HTMLDivElement>()

    state = this.initialState

    render() {
      const { open, searchQuery } = this.state

      return (
        <>
          <div
            contentEditable
            ref={this.contendEditableRef}
            onKeyUp={this.handleEditorKeyUp}
            style={editorStyle}
          />
          <PortalAtCursorPosition open={open}>
            <MentionsContainerComponent
              items={atMentionItems}
              open={open}
              searchQuery={searchQuery}
              onOpenChange={this.handleOpenChange}
              onSearchQueryChange={this.handleSearchQueryChange}
              onInputKeyDown={this.handleInputKeyDown}
              onSelectedChange={this.handleSelectedChange}
              {...this.props}
            />
          </PortalAtCursorPosition>
        </>
      )
    }

    private handleEditorKeyUp = (e: React.KeyboardEvent) => {
      if (!this.state.open && e.shiftKey && keyboardKey.getCode(e) === keyboardKey.AtSign) {
        this.setState({ open: true })
      }
    }

    private handleOpenChange = (e: React.SyntheticEvent, { open }: MentionsContainerProps) => {
      if (!open) {
        this.resetStateAndUpdateEditor()
      }
    }

    private handleSelectedChange = (
      e: React.SyntheticEvent,
      { searchQuery }: MentionsContainerProps,
    ) => {
      this.resetStateAndUpdateEditor(searchQuery)
    }

    private handleSearchQueryChange = (
      e: React.SyntheticEvent,
      { searchQuery }: MentionsContainerProps,
    ) => {
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

    private resetStateAndUpdateEditor = (searchQuery?: string) => {
      const { open } = this.state
      const newSearchQuery = searchQuery || this.state.searchQuery

      if (open) {
        this.setState(this.initialState, () => {
          this.tryFocusEditor()

          // after the wrapped component is closed the value of the search query is inserted in the editor at cursor position
          insertTextAtCursorPosition(newSearchQuery)
        })
      }
    }

    private tryFocusEditor = () => _.invoke(this.contendEditableRef.current, 'focus')
  }

export default withMentionsEditor

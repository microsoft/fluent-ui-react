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
  shouldUpdate: boolean
  open: boolean
  searchQuery: string
  selectedItem: string
}

interface MentionsEditorAction {
  type: 'OPEN' | 'UPDATE_AND_CLOSE' | 'RESET_UPDATE_FLAG' | 'SET_SEARCH_QUERY'
  args?: string
}

const editorStyle: React.CSSProperties = {
  backgroundColor: '#eee',
  borderRadius: '5px',
  border: '1px dashed grey',
  padding: '5px',
  minHeight: '100px',
  outline: 0,
}

const stateReducer = (state: MentionsEditorState, action: MentionsEditorAction) => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, open: true }
    case 'RESET_UPDATE_FLAG':
      return { ...state, shouldUpdate: false }
    case 'UPDATE_AND_CLOSE':
      return {
        ...state,
        shouldUpdate: true,
        open: false,
        searchQuery: '',
        selectedItem: action.args,
      }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.args }
    default:
      throw new Error(`Action ${action.type} is not supported`)
  }
}

const MentionsEditor: React.FunctionComponent<
  MentionsContainerProps & { children: (props: MentionsContainerProps) => React.ReactNode }
> = props => {
  const { children, ...rest } = props
  const contendEditableRef = React.useRef(null)
  const [state, dispatch] = React.useReducer(stateReducer, {
    shouldUpdate: false,
    open: false,
    searchQuery: '',
    selectedItem: '',
  })

  React.useEffect(
    () => {
      if (!state.shouldUpdate) {
        return
      }

      _.invoke(contendEditableRef.current, 'focus')

      // after the wrapped component is closed the value of the search query is inserted in the editor at cursor position
      insertTextAtCursorPosition(state.selectedItem)
      dispatch({ type: 'RESET_UPDATE_FLAG' })
    },
    [state.shouldUpdate],
  )

  const handleEditorKeyUp = (e: React.KeyboardEvent) => {
    if (!state.open && e.shiftKey && keyboardKey.getCode(e) === keyboardKey.AtSign) {
      dispatch({ type: 'OPEN' })
    }
  }

  const handleOpenChange = (e: React.SyntheticEvent, { open }: MentionsContainerProps) => {
    if (!open) {
      resetStateAndUpdateEditor()
    }
  }

  const handleSelectedChange = (
    e: React.SyntheticEvent,
    { searchQuery }: MentionsContainerProps,
  ) => {
    resetStateAndUpdateEditor(searchQuery)
  }

  const handleSearchQueryChange = (
    e: React.SyntheticEvent,
    { searchQuery }: MentionsContainerProps,
  ) => {
    dispatch({ type: 'SET_SEARCH_QUERY', args: searchQuery })
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    const keyCode = keyboardKey.getCode(e)
    switch (keyCode) {
      case keyboardKey.Backspace: // 8
        if (state.searchQuery === '') {
          resetStateAndUpdateEditor()
        }
        break
      case keyboardKey.Escape: // 27
        resetStateAndUpdateEditor()
        break
    }
  }

  const resetStateAndUpdateEditor = (searchQueryArg?: string) => {
    if (state.open) {
      dispatch({ type: 'UPDATE_AND_CLOSE', args: searchQueryArg || state.searchQuery })
    }
  }

  return (
    <>
      <div
        contentEditable
        ref={contendEditableRef}
        onKeyUp={handleEditorKeyUp}
        style={editorStyle}
      />
      <PortalAtCursorPosition open={state.open}>
        {children({
          items: atMentionItems,
          open: state.open,
          searchQuery: state.searchQuery,
          onOpenChange: handleOpenChange,
          onSearchQueryChange: handleSearchQueryChange,
          onInputKeyDown: handleInputKeyDown,
          onSelectedChange: handleSelectedChange,
          ...rest,
        })}
      </PortalAtCursorPosition>
    </>
  )
}

export default MentionsEditor

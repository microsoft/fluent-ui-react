import {
  Button,
  Divider,
  Form,
  Grid,
  Popup,
  Ref,
  ShorthandValue,
  Text,
  Toolbar,
  ToolbarItemProps,
  ToolbarItemShorthandKinds,
  ToolbarMenuItemProps,
  ToolbarMenuItemShorthandKinds,
} from '@stardust-ui/react'
import * as React from 'react'
import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import { documentRef, useEventListener } from '@stardust-ui/react-component-event-listener'
import { CodeSnippet } from '@stardust-ui/docs-components'

enum FontFormatting {
  Paragraph,
  Heading1 = 1,
  Heading2 = 2,
  Heading3 = 3,
}

type EditorState = {
  bold: boolean
  italic: boolean
  underline: boolean
  //
  fontHighlight: boolean
  fontColor: boolean
  fontSize: boolean
  fontFormatting: FontFormatting
  //
  itemList: boolean
  numberList: boolean
  //
  quote: boolean
  link: boolean
  code: boolean
  table: boolean
  //
  important: boolean
  //
  more: boolean
}

type EditorAction =
  | { type: 'BOLD'; value: boolean }
  | { type: 'ITALIC'; value: boolean }
  | { type: 'UNDERLINE'; value: boolean }
  | { type: 'LINK'; value: boolean }
  | { type: 'TABLE'; value: boolean }
  | { type: 'MORE'; value: boolean }

const initialState: EditorState = {
  bold: false,
  italic: false,
  underline: false,
  //
  fontHighlight: false,
  fontColor: false,
  fontSize: false,
  fontFormatting: FontFormatting.Paragraph,
  //
  itemList: false,
  numberList: false,
  //
  quote: false,
  link: false,
  code: false,
  table: false,
  //
  important: false,
  //
  more: false,
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'BOLD':
      return { ...state, bold: action.value }
    case 'ITALIC':
      return { ...state, italic: action.value }
    case 'UNDERLINE':
      return { ...state, underline: action.value }
    //
    case 'LINK':
      return { ...state, link: action.value }
    case 'TABLE':
      return { ...state, table: action.value }
    //
    case 'MORE':
      return { ...state, more: action.value }
  }

  return state
}

const EditorToolbar = () => {
  const [state, dispatch] = React.useReducer(editorReducer, initialState)

  const overflowIndex = React.useRef<number>()

  const linkItemRef = React.useRef<HTMLElement>(null)
  const toolbarRef = React.useRef<HTMLElement>(null)

  const betterItems: {
    toolbarItem: ShorthandValue<ToolbarItemProps & { kind?: ToolbarItemShorthandKinds }>
    overflowItem?: ShorthandValue<ToolbarMenuItemProps & { kind?: ToolbarMenuItemShorthandKinds }>
  }[] = [
    {
      toolbarItem: {
        key: 'bold',
        icon: 'bold',
        active: state.bold,
        onClick: () => dispatch({ type: 'BOLD', value: !state.bold }),
      },
    },
    {
      toolbarItem: {
        key: 'italic',
        icon: 'italic',
        active: state.italic,
        onClick: () => dispatch({ type: 'ITALIC', value: !state.italic }),
      },
    },
    {
      toolbarItem: {
        key: 'underline',
        icon: 'underline',
        active: state.underline,
        onClick: () => dispatch({ type: 'UNDERLINE', value: !state.underline }),
      },
    },

    { toolbarItem: { key: 'divider-1', kind: 'divider' } },

    { toolbarItem: { key: 'highlight', icon: 'highlight', active: state.fontHighlight } },
    { toolbarItem: { key: 'font-color', icon: 'font-color', active: state.fontColor } },
    { toolbarItem: { key: '', icon: 'font-size', active: state.fontSize } },
    // TODO: Font format

    { toolbarItem: { key: 'remove-format', icon: 'remove-format' } },
    { toolbarItem: { key: 'divider-2', kind: 'divider' } },

    { toolbarItem: { key: 'bullets', icon: 'bullets', active: state.itemList } },
    { toolbarItem: { key: 'number-list', icon: 'number-list', active: state.numberList } },

    { toolbarItem: { key: 'divider-3', kind: 'divider' } },

    {
      toolbarItem: render =>
        render(
          {
            key: 'link',
            icon: 'link',
            active: state.link,
            onClick: () => dispatch({ type: 'LINK', value: true }),
          },
          (Component, props) => (
            <Ref innerRef={linkItemRef}>
              <Component {...props} />
            </Ref>
          ),
        ),
      overflowItem: {
        key: 'link',
        icon: 'link',
        content: 'Insert link',
        onClick: () => dispatch({ type: 'LINK', value: true }),
      },
    },
    {
      toolbarItem: {
        key: 'code',
        icon: 'code-snippet',
        // content: 'Insert code snippet',
        active: state.code,
      },
      overflowItem: {
        key: 'code',
        icon: 'code-snippet',
        content: 'Insert code snippet',
        active: state.code,
      },
    },
    {
      toolbarItem: {
        key: 'table',
        icon: 'table',
        content: 'Insert table',
        active: state.table,

        popup: {
          content: (
            <>
              <Text>Insert your table</Text>
              <Grid columns={3}>
                {_.times(9, i => (
                  <button
                    key={i}
                    onClick={() => {
                      dispatch({ type: 'TABLE', value: false })
                      dispatch({ type: 'MORE', value: false })
                    }}
                    style={{
                      background: 'aliceblue',
                      display: 'block',
                      height: '9px',
                      width: '9px',
                      margin: '0 3px',
                    }}
                  >
                    {' '}
                  </button>
                ))}
              </Grid>
            </>
          ),
          onOpenChange: (e, { open }) => dispatch({ type: 'TABLE', value: open }),
          open: state.table,
        },
      },
    },
  ]

  useEventListener({
    listener: (e: KeyboardEvent) => {
      const code = keyboardKey.getCode(e)

      if (code === keyboardKey.K && e.ctrlKey) {
        // Ctrl+K is a browser hotkey, it's required to prevent defaults
        e.preventDefault()
        dispatch({ type: 'LINK', value: true })
      }
    },
    type: 'keydown',
    targetRef: documentRef,
  })

  const linkItemIndex = 12
  const linkInOverflowMenu = overflowIndex.current <= linkItemIndex
  const linkTarget = linkInOverflowMenu ? toolbarRef : linkItemRef
  console.log('RENDER', linkInOverflowMenu)

  return (
    <>
      <Popup
        content={
          <>
            <Form
              fields={[
                {
                  label: 'Address',
                  name: 'address',
                  id: 'link-address',
                  key: 'address',
                  required: true,
                  inline: true,
                },
              ]}
            />
            <Divider hidden />
            <Button.Group
              buttons={[
                {
                  key: 'cancel',
                  content: 'Cancel',
                  onClick: () => dispatch({ type: 'LINK', value: false }),
                },
                {
                  key: 'insert',
                  content: 'Insert',
                  onClick: () => dispatch({ type: 'LINK', value: false }),
                },
              ]}
            />
          </>
        }
        open={state.link}
        pointing
        target={linkTarget.current}
      />

      <Ref innerRef={toolbarRef}>
        <Toolbar
          items={_.map(betterItems, 'toolbarItem')}
          overflow
          overflowOpen={state.more}
          onOverflow={itemsVisible => {
            console.log('onOverflow', itemsVisible)
            overflowIndex.current = itemsVisible - 1
          }}
          onOverflowOpenChange={(e, { overflowOpen }) =>
            dispatch({ type: 'MORE', value: overflowOpen })
          }
          getOverflowItems={startIndex => {
            return _.map(betterItems.slice(startIndex), item =>
              _.get(item, 'overflowItem', item.toolbarItem),
            )
          }}
        />
      </Ref>

      <CodeSnippet mode="json" value={state} />
    </>
  )
}

export default EditorToolbar

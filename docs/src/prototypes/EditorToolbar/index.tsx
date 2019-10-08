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
  | { type: 'BOLD' }
  | { type: 'ITALIC' }
  | { type: 'UNDERLINE' }
  | { type: 'LINK_OPEN' }
  | { type: 'LINK_CLOSE' }
  | { type: 'LINK_INSERT'; href: string }
  | { type: 'TABLE_OPEN' }
  | { type: 'TABLE_CLOSE' }
  | { type: 'MORE_OPEN' }
  | { type: 'MORE_CLOSE' }

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
  if (action.type === 'BOLD') {
    return { ...state, bold: !state.bold }
  }

  if (action.type === 'ITALIC') {
    return { ...state, italic: !state.italic }
  }

  if (action.type === 'UNDERLINE') {
    return { ...state, underline: !state.underline }
  }

  if (action.type === 'LINK_OPEN') {
    return { ...state, link: true }
  }

  if (action.type === 'LINK_CLOSE') {
    return { ...state, link: false }
  }

  if (action.type === 'LINK_INSERT') {
    return { ...state, link: false }
  }

  if (action.type === 'TABLE_OPEN') {
    return { ...state, table: true }
  }

  if (action.type === 'TABLE_CLOSE') {
    return { ...state, table: false }
  }

  if (action.type === 'MORE_OPEN') {
    return { ...state, more: true }
  }

  if (action.type === 'MORE_CLOSE') {
    return { ...state, more: false }
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
        onClick: () => dispatch({ type: 'BOLD' }),
      },
    },
    {
      toolbarItem: {
        key: 'italic',
        icon: 'italic',
        active: state.italic,
        onClick: () => dispatch({ type: 'ITALIC' }),
      },
    },
    {
      toolbarItem: {
        key: 'underline',
        icon: 'underline',
        active: state.underline,
        onClick: () => dispatch({ type: 'UNDERLINE' }),
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
            onClick: () => dispatch({ type: 'LINK_OPEN' }),
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
        onClick: () => dispatch({ type: 'LINK_OPEN' }),
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
        content: 'Insert TABLE XXX FIX ME XXX',
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
                      dispatch({ type: 'TABLE_CLOSE' })
                      dispatch({ type: 'MORE_CLOSE' })
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
          onOpenChange: (e, { open }) => {
            if (open) {
              dispatch({ type: 'TABLE_OPEN' })
            } else {
              dispatch({ type: 'TABLE_CLOSE' })
            }
          },
          open: state.table,
        },
      },
    },
  ]

  useEventListener({
    listener: (e: KeyboardEvent) => {
      const code = keyboardKey.getCode(e)

      if (code === keyboardKey.K && e.ctrlKey) {
        e.preventDefault()
        dispatch({ type: 'LINK_OPEN' })
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
    <div style={{ margin: '10rem', border: '2px solid green' }}>
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
                { content: 'Cancel', onClick: () => dispatch({ type: 'LINK_CLOSE' }) },
                {
                  content: 'Insert',
                  onClick: () => dispatch({ type: 'LINK_INSERT', href: 'FOO' }),
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
          onOverflowOpenChange={(e, { overflowOpen }) => {
            if (overflowOpen) {
              dispatch({ type: 'MORE_OPEN' })
            } else {
              dispatch({ type: 'MORE_CLOSE' })
            }
          }}
          getOverflowItems={startIndex => {
            return _.map(betterItems.slice(startIndex), item =>
              _.get(item, 'overflowItem', item.toolbarItem),
            )
          }}
        />
      </Ref>
    </div>
  )
}

export default EditorToolbar

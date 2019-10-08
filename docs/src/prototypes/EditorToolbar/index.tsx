import {
  Button,
  Divider,
  Form,
  Grid,
  Popup,
  Ref,
  Text,
  Toolbar,
  ToolbarProps,
} from '@stardust-ui/react'
import * as React from 'react'
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

  const items: ToolbarProps['items'] = [
    { key: 'bold', icon: 'bold', active: state.bold, onClick: () => dispatch({ type: 'BOLD' }) },
    {
      key: 'italic',
      icon: 'italic',
      active: state.italic,
      onClick: () => dispatch({ type: 'ITALIC' }),
    },
    {
      key: 'underline',
      icon: 'underline',
      active: state.underline,
      onClick: () => dispatch({ type: 'UNDERLINE' }),
    },

    { key: 'divider-1', kind: 'divider' },

    { key: 'highlight', icon: 'highlight', active: state.fontHighlight },
    { key: 'font-color', icon: 'font-color', active: state.fontColor },
    { key: '', icon: 'font-size', active: state.fontSize },
    // TODO: Font format

    { key: 'remove-format', icon: 'remove-format' },
    { key: 'divider-2', kind: 'divider' },

    { key: 'bullets', icon: 'bullets', active: state.itemList },
    { key: 'number-list', icon: 'number-list', active: state.numberList },

    { key: 'divider-3', kind: 'divider' },

    render =>
      render(
        {
          key: 'link',
          icon: 'link',
          active: state.link,
          content: 'Insert link',
          onClick: () => dispatch({ type: 'LINK_OPEN' }),
        },
        (Component, props) => (
          <Ref innerRef={linkItemRef}>
            <Component {...props} />
          </Ref>
        ),
      ),
    { key: 'code', icon: 'code-snippet', content: 'Insert code snippet', active: state.code },
    {
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
          items={items}
          overflow
          overflowOpen={state.more}
          onOverflow={index => {
            overflowIndex.current = index
          }}
          onOverflowChange={(e, { overflowOpen }) => {
            if (overflowOpen) {
              dispatch({ type: 'MORE_OPEN' })
            } else {
              dispatch({ type: 'MORE_CLOSE' })
            }
          }}
        />
      </Ref>
    </div>
  )
}

export default EditorToolbar

import {
  Button,
  Divider,
  Flex,
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
import {
  EditorToolbarAction,
  EditorToolbarState,
} from 'docs/src/prototypes/EditorToolbar/editorToolbarReducer'

type EditorToolbarProps = EditorToolbarState & {
  dispatch: React.Dispatch<EditorToolbarAction>
}

const EditorToolbar: React.FC<EditorToolbarProps> = props => {
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
        active: props.bold,
        onClick: () => props.dispatch({ type: 'BOLD', value: !props.bold }),
      },
    },
    {
      toolbarItem: {
        key: 'italic',
        icon: 'italic',
        active: props.italic,
        onClick: () => props.dispatch({ type: 'ITALIC', value: !props.italic }),
      },
    },
    {
      toolbarItem: {
        key: 'underline',
        icon: 'underline',
        active: props.underline,
        onClick: () => props.dispatch({ type: 'UNDERLINE', value: !props.underline }),
      },
    },

    { toolbarItem: { key: 'divider-1', kind: 'divider' } },

    { toolbarItem: { key: 'highlight', icon: 'highlight', active: props.fontHighlight } },
    { toolbarItem: { key: 'font-color', icon: 'font-color', active: props.fontColor } },
    { toolbarItem: { key: '', icon: 'font-size', active: props.fontSize } },
    // TODO: Font format

    { toolbarItem: { key: 'remove-format', icon: 'remove-format' } },
    { toolbarItem: { key: 'divider-2', kind: 'divider' } },

    { toolbarItem: { key: 'bullets', icon: 'bullets', active: props.itemList } },
    { toolbarItem: { key: 'number-list', icon: 'number-list', active: props.numberList } },

    { toolbarItem: { key: 'divider-3', kind: 'divider' } },

    {
      toolbarItem: render =>
        render(
          {
            key: 'link',
            icon: 'link',
            active: props.link,
            onClick: () => props.dispatch({ type: 'LINK', value: true }),
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
        onClick: () => props.dispatch({ type: 'LINK', value: true }),
      },
    },
    {
      toolbarItem: {
        key: 'code',
        icon: 'code-snippet',
        // content: 'Insert code snippet',
        active: props.code,
      },
      overflowItem: {
        key: 'code',
        icon: 'code-snippet',
        content: 'Insert code snippet',
        active: props.code,
      },
    },
    {
      toolbarItem: {
        key: 'table',
        icon: 'table',
        content: 'Insert table',
        active: props.table,

        popup: {
          content: (
            <>
              <Text>Insert your table</Text>
              <Grid columns={3}>
                {_.times(9, i => (
                  <button
                    key={i}
                    onClick={() => {
                      props.dispatch({ type: 'TABLE', value: false })
                      props.dispatch({ type: 'MORE', value: false })
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
          onOpenChange: (e, { open }) => props.dispatch({ type: 'TABLE', value: open }),
          open: props.table,
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
        props.dispatch({ type: 'LINK', value: true })
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
                  onClick: () => props.dispatch({ type: 'LINK', value: false }),
                },
                {
                  key: 'insert',
                  content: 'Insert',
                  onClick: () => props.dispatch({ type: 'LINK', value: false }),
                },
              ]}
            />
          </>
        }
        open={props.link}
        pointing
        target={linkTarget.current}
      />

      <Flex>
        <Ref innerRef={toolbarRef}>
          <Toolbar
            styles={{ minWidth: 0, flexGrow: 1 }} // necessary for Toolbar with overflow inside a flex container
            items={_.map(betterItems, 'toolbarItem')}
            overflow
            overflowOpen={props.more}
            onOverflow={itemsVisible => {
              console.log('onOverflow', itemsVisible)
              overflowIndex.current = itemsVisible - 1
            }}
            onOverflowOpenChange={(e, { overflowOpen }) => {
              props.dispatch({ type: 'MORE', value: overflowOpen })
            }}
            getOverflowItems={startIndex => {
              return _.map(betterItems.slice(startIndex), item =>
                _.get(item, 'overflowItem', item.toolbarItem),
              )
            }}
          />
        </Ref>
        <Toolbar items={[{ icon: { name: 'trash-can', outline: true } }]} />
      </Flex>
    </>
  )
}

export default EditorToolbar

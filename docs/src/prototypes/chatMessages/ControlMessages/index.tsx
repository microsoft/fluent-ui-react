import * as React from 'react'
import {
  Avatar,
  Tree,
  ChatItemProps,
  ShorthandCollection,
  Chat,
  Divider,
  Ref,
} from '@stardust-ui/react'
import * as keyboardKey from 'keyboard-key'
import overridenTreeItemBehavior from './overridenTreeItemBehavior'
import overridenTreeBehavior from './overridenTreeBehavior'
import overridenTreeTitleBehavior from 'docs/src/prototypes/chatMessages/ControlMessages/overridenTreeTitleBehavior'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
  },
}

const treeItems = [
  render =>
    render({}, (Component, props) => {
      const createdRef = React.createRef<HTMLButtonElement>()
      return (
        <Component
          {...props}
          key="11"
          accessibility={overridenTreeItemBehavior}
          title={render =>
            render(
              {
                onKeyDown: e => {
                  if (keyboardKey.getCode(e) === keyboardKey.Escape) {
                    e.stopPropagation()
                    createdRef.current.focus()
                  }
                },
                as: 'div',
                accessibility: overridenTreeTitleBehavior,
                content: (
                  <div>
                    <a href="/">John Doe1</a> added <a href="/">Jane Doe1</a> to the conversation
                  </div>
                ),
              },
              (Component, props) => (
                <Ref innerRef={createdRef}>
                  <Component {...props} />
                </Ref>
              ),
            )
          }
        />
      )
    }),
  render =>
    render({}, (Component, props) => {
      const createdRef = React.createRef<HTMLButtonElement>()
      return (
        <Component
          {...props}
          accessibility={overridenTreeItemBehavior}
          key="21"
          title={render =>
            render(
              {
                onKeyDown: e => {
                  if (keyboardKey.getCode(e) === keyboardKey.Escape) {
                    e.stopPropagation()
                    createdRef.current.focus()
                  }
                },
                as: 'div',
                accessibility: overridenTreeTitleBehavior,
                content: (
                  <div>
                    <a href="/">John Doe2</a> added <a href="/">Jane Doe2</a> to the conversation
                  </div>
                ),
              },
              (Component, props) => (
                <Ref innerRef={createdRef}>
                  <Component {...props} />
                </Ref>
              ),
            )
          }
        />
      )
    }),
]

const ChatExample = () => {
  const [open, setOpen] = React.useState(false)

  const items: ShorthandCollection<ChatItemProps> = [
    {
      message: {
        onKeyDown: e => {
          const eventCode = keyboardKey.getCode(e)
          if (eventCode === keyboardKey.Enter || eventCode === keyboardKey.Spacebar) {
            setOpen(true)
          }
          if (eventCode === keyboardKey.Escape) {
            setOpen(false)
          }
        },
        content: (
          <Tree
            data-is-focusable="true"
            accessibility={overridenTreeBehavior}
            items={[
              render =>
                render({}, (TreeItem, treeItemProps) => {
                  const createdRef = React.createRef<HTMLButtonElement>()
                  return (
                    <TreeItem
                      {...treeItemProps}
                      accessibility={overridenTreeItemBehavior}
                      items={treeItems}
                      open={open}
                      key="1"
                      title={render =>
                        render(
                          {
                            onKeyDown: e => {
                              if (keyboardKey.getCode(e) === keyboardKey.Escape) {
                                createdRef.current.focus()
                                e.stopPropagation()
                              }
                            },
                            onClick: () => setOpen(!open),
                            as: 'div',
                            accessibility: overridenTreeTitleBehavior,
                            content: (
                              <div>
                                <a href="/">John Doe</a> added <a href="/">Jane Doe</a> to the
                                conversation
                              </div>
                            ),
                          },
                          (TreeTitle, treeTitleProps) => (
                            <Ref innerRef={createdRef}>
                              <TreeTitle {...treeTitleProps} />
                            </Ref>
                          ),
                        )
                      }
                    />
                  )
                }),
            ]}
          />
        ),
      },
    },
    {
      gutter: {
        content: <Avatar {...janeAvatar} />,
      },
      message: {
        content: (
          <Chat.Message
            content="Sure! Let's try it."
            author="Jane Doe"
            timestamp="Yesterday, 10:15 PM"
          />
        ),
      },
      key: 'message-id-8',
    },
    {
      children: <Divider content="Today" color="brand" important />,
      key: 'message-id-9',
    },
    {
      message: {
        content: (
          <Chat.Message
            content="Ok, let's go."
            author="John Doe"
            timestamp="Today, 11:15 PM"
            mine
          />
        ),
      },
      contentPosition: 'end',
      key: 'message-id-10',
    },
  ]
  return <Chat items={items} />
}

export default ChatExample

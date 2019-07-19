import * as React from 'react'
import {
  Avatar,
  Tree,
  TreeTitle,
  TreeItem,
  FocusZoneMode,
  FocusZoneDirection,
  FocusZoneTabbableElements,
  Chat,
  Divider,
  treeBehavior,
  treeTitleBehavior,
} from '@stardust-ui/react'
import * as keyboardKey from 'keyboard-key'
import { Accessibility } from 'src/lib/accessibility/types'
import { ChatItemProps } from 'src/components/Chat/ChatItem'
import { ShorthandCollection } from 'src/types'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
  },
}

const overridenTreeBehavior: Accessibility<any> = props => {
  return {
    ...treeBehavior(props),
    focusZone: {
      mode: FocusZoneMode.Embed,
      props: {
        shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
        direction: FocusZoneDirection.vertical,
      },
    },
  }
}

const overridenTreeTitleBehavior: Accessibility<any> = props => {
  return {
    ...treeTitleBehavior(props),
    focusZone: {
      mode: FocusZoneMode.Embed,
      props: {
        handleTabKey: FocusZoneTabbableElements.all,
        isCircularNavigation: true,
        direction: FocusZoneDirection.vertical,
      },
    },
  }
}

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
            // TODO very ugly check...
            // if it comes from some tree title close the tree
            if (
              e.target.className.indexOf(TreeTitle.className) !== -1 ||
              e.target.className.indexOf(TreeItem.className) !== -1
            ) {
              setOpen(false)
            }
          }
        },
        content: (
          <Tree
            data-is-focusable="true"
            accessibility={overridenTreeBehavior}
            items={[
              {
                onKeyDown: e => {
                  // Without this override, the focus zone for the tree title is not working..
                  console.log('Tree item 1 key down')
                },
                key: '1',
                title: {
                  as: 'div',
                  accessibility: overridenTreeTitleBehavior,
                  content: (
                    <div>
                      <a href="/">John Doe</a> added <a href="/">Jane Doe</a> to the conversation
                    </div>
                  ),
                  onClick: () => setOpen(!open),
                },
                open,
                items: [
                  {
                    onKeyDown: e => {
                      // Without this override, the focus zone for the tree title is not working..
                      console.log('Tree item 2 key down')
                    },
                    key: '11',
                    title: {
                      accessibility: overridenTreeTitleBehavior,
                      as: 'div',
                      content: (
                        <div>
                          <a href="/">John Doe</a> added <a href="/">Jane Doe</a> to the
                          conversation
                        </div>
                      ),
                    },
                  },
                  {
                    onKeyDown: e => {
                      // Without this override, the focus zone for the tree title is not working..
                      console.log('Tree item 3 key down')
                    },
                    key: '21',
                    title: {
                      as: 'div',
                      accessibility: overridenTreeTitleBehavior,
                      content: (
                        <div>
                          <a href="/">John Doe</a> added <a href="/">Jane Doe</a> to the
                          conversation
                        </div>
                      ),
                    },
                  },
                ],
              },
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

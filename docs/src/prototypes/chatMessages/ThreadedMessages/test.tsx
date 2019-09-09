import * as React from 'react'
import {
  Chat,
  ChatItemProps,
  ShorthandCollection,
  Avatar,
  Provider,
  themes,
  Button,
  Flex,
  FlexItem,
} from '@stardust-ui/react'
import ThreadedMessage from './ThreadedMessage'
import threadChatBehavior from './threadChatBehavior'
import { janeAvatar, replies } from './mockData'
import * as ReactDOM from 'react-dom'

const PortalWindow = ({ children, onClose }) => {
  const externalContainer = React.useRef(null)
  const externalWindow = React.useRef(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200')
    externalContainer.current = externalWindow.current.document.createElement('div')
    externalWindow.current.document.body.appendChild(externalContainer.current)
    if (onClose) externalWindow.current.onbeforeunload = onClose
    setMounted(true)
    return () => {
      externalWindow.current.close()
    }
  }, [])
  return (
    mounted &&
    ReactDOM.createPortal(
      children(externalContainer.current.ownerDocument),
      externalContainer.current,
    )
  )
}

const PortalContent = ({ externalDocument }) => {
  const items: ShorthandCollection<ChatItemProps> = [
    {
      gutter: <Avatar {...janeAvatar} />,
      message: (
        <ThreadedMessage
          subject="Beer on Friday evening"
          content="Weather is perfect for a beer outside. What do you think?"
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
          replies={replies}
        />
      ),
      key: 'thread-message-id-1',
    },
  ]
  return (
    <Provider theme={themes.teamsDark} target={externalDocument}>
      <Flex>
        <FlexItem push>
          <Chat accessibility={threadChatBehavior} items={items} />
        </FlexItem>
      </Flex>
    </Provider>
  )
}

const Test = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open window!</Button>
      {open && (
        <PortalWindow onClose={() => setOpen(false)}>
          {externalDocument => <PortalContent externalDocument={externalDocument} />}
        </PortalWindow>
      )}
    </>
  )
}
export default Test

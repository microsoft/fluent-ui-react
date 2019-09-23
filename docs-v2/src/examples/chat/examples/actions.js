import React from "react"
import {Chat} from "@stardust-ui/react"

// description: A chat message can show actions when it is hovered or focused.
const actionMenu = {
  iconOnly: true,
  items: [
    {
      key: "like",
      icon: "like",
      title: "Like"
    },
    {
      key: "more",
      icon: "more",
      title: "More actions"
    }
  ]
}
const items = [
  {
    attached: "top",
    contentPosition: "end",
    message: {
      content: (
        <Chat.Message
          actionMenu={actionMenu}
          content="Hello"
          author="Michael Scott"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      )
    },
    key: "message-1"
  },
  {
    attached: "bottom",
    contentPosition: "end",
    key: "message-2",
    message: {
      content: (
        <Chat.Message
          actionMenu={actionMenu}
          content="I'm back!"
          author="Michael Scott"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      )
    }
  },
  {
    gutter: {
      content: <Avatar image="/images/avatar-placeholder.jpg" />
    },
    message: {
      content: (
        <Chat.Message
          actionMenu={actionMenu}
          content="Welcome back!"
          author="Dwight Schrute"
          timestamp="Yesterday, 10:15 PM"
        />
      )
    },
    key: "message-3"
  }
]

export default (
  <Chat style={{background: "none", border: "none"}} items={items} />
)

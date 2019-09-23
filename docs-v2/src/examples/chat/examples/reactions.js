import React from "react"
import {Chat} from "@stardust-ui/react"

// description: A chat message can render reactions from other users.
const LIKED = {key: "like", icon: "like", content: 5}
const SMILED = {key: "emoji", icon: "emoji", content: 2}
const items = [
  {
    key: 1,
    attached: "top",
    contentPosition: "end",
    message: {
      content: (
        <Chat.Message
          reactionGroup={[LIKED]}
          content="Hello"
          author="Michael Scott"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      )
    }
  },
  {
    key: 2,
    attached: "bottom",
    contentPosition: "end",
    message: {
      content: (
        <Chat.Message
          reactionGroup={[SMILED]}
          content="I'm back!"
          author="Michael Scott"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      )
    }
  },
  {
    key: 3,
    gutter: {
      content: <Avatar image="/images/avatar-placeholder.jpg" />
    },
    message: {
      content: (
        <Chat.Message
          reactionGroup={[LIKED, SMILED]}
          content="Welcome back!"
          author="Dwight Schrute"
          timestamp="Yesterday, 10:15 PM"
        />
      )
    }
  }
]

export default (
  <Chat style={{background: "none", border: "none"}} items={items} />
)

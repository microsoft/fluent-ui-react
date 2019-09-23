import React from "react"
import {Chat} from "@stardust-ui/react"

// description: A chat can display a badge to indicate special information about the message.
export default (
  <Chat
    style={{background: "none", border: "none"}}
    items={[
      {
        key: 1,
        message: {
          content: (
            <Chat.Message
              mine
              content="Hey, we need to talk."
              timestamp="Yesterday, 10:13pm"
              author="Dwight Schrute"
              badge={{icon: "redbang"}}
              badgePosition="start"
              variables={{isImportant: true}}
            />
          )
        },
        contentPosition: "end"
      },
      {
        key: 2,
        gutter: {
          content: <Avatar image="/images/avatar-placeholder.jpg" />
        },
        message: {
          content: (
            <Chat.Message
              content="Sure @Dwight. Let's schedule a meeting."
              timestamp="Yesterday, 10:15pm"
              author="Michael Scott"
              badge={{icon: "mention"}}
            />
          )
        }
      }
    ]}
  />
)

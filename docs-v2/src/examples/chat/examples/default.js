import React from "react"
import {Chat} from "@stardust-ui/react"

// description: The default chat style.
export default (
  <Chat
    style={{background: "none", border: "none"}}
    items={[
      {
        key: 1,
        message: (
          <Chat.Message
            mine
            content="Hey there! I didn't know you all had a secret chat!"
            author="Michael Scott"
            timestamp="Yesterday, 10:00PM"
          />
        ),
        contentPosition: "end"
      },
      {
        key: 2,
        children: <Divider content="Today" color="brand" important />
      },
      {
        key: 3,
        gutter: <Avatar image="/images/avatar-placeholder.jpg" color="green" />,
        message: (
          <Chat.Message
            content="Hey Michael!"
            author="Toby Flenderson"
            timestamp="Today, 9:00AM"
          />
        )
      },
      {
        key: 4,
        message: (
          <Chat.Message
            mine
            content="Oh god, no!"
            author="Michael"
            timestamp="Today, 9:01AM"
            reactionGroup={[{key: "like", icon: "like", content: 2}]}
          />
        ),
        contentPosition: "end"
      }
    ]}
  />
)

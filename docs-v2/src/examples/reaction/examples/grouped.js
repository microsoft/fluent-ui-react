import React from "react"
import {Reaction} from "@stardust-ui/react"

// description: Multiple reactions can be rendered as a group.
export default (
  <Reaction.Group
    items={[
      {key: "like", icon: "like", content: 12},
      {key: "smile", icon: "emoji", content: 5}
    ]}
  />
)

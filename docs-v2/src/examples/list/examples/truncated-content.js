import React from "react"
import {List} from "@stardust-ui/react"

// description:
export default (
  <List
    truncateHeader
    truncateContent
    style={{maxWidth: "100%"}}
    items={[
      {header: "First Item", content: "This is some mock content"},
      {
        header: "Second Item",
        content:
          "Here is really, really long content that spans quite a bit of horizontal space. Notice how it gets truncated when it reaches the edge of the list."
      },
      {
        header:
          "Third Item: Notice how header content can also be truncated when it gets too long.",
        content:
          "Here is really, really long content that spans quite a bit of horizontal space. Notice how it gets truncated when it reaches the edge of the list."
      }
    ]}
  />
)
